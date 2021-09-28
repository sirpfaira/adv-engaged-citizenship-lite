const express = require('express');
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
//const cors = require('cors');
//app.use(cors({ origin: true, methods: ['GET', 'POST'], credentials: true }));
const { Pool } = require('pg');
require('dotenv').config();

const dbUrl =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DB}`;

const pool = new Pool({
  connectionString: dbUrl,
  connectionTimeoutMillis: 5000,
  ssl: dbUrl.includes('localhost') ? false : { rejectUnauthorized: false },
});

app.get('/projects', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE featured = true LIMIT 12'
    );
    if (result.rowCount > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(400).json({ message: 'No featured projects found!' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error! Couldn't load data from server` });
  }
});

app.get('/testimonials', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials');
    if (result.rowCount > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(400).json({ message: 'No testimonials found!' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error! Couldn't load data from server` });
  }
});

app.get('/team', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team');
    if (result.rowCount > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(400).json({ message: 'No data found!' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error! Couldn't load data from server` });
  }
});

app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    if (result.rowCount > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(400).json({ message: 'No students found!' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error! Couldn't load data from server` });
  }
});

app.get('/students/:studentId', async function (req, res) {
  const { studentId } = req.params;
  if (studentId) {
    try {
      const result = await pool.query(`SELECT * FROM students WHERE id = $1`, [
        studentId,
      ]);
      if (result.rowCount > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(400).json({ message: 'No student with such id was found!' });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(500).json({ message: `No id was provided` });
  }
});

app.get('/myprojects/:studentId', async function (req, res) {
  const { studentId } = req.params;
  if (studentId) {
    try {
      const result = await pool.query(
        `SELECT * FROM projects WHERE owner = $1`,
        [studentId]
      );
      if (result.rowCount > 0) {
        res.status(200).json(result.rows);
      } else {
        res.status(400).json({ message: 'No projects found!' });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(500).json({ message: `No user ID was provided` });
  }
});

app.post('/createproject/:studentId', async function (req, res) {
  const { studentId } = req.params;
  const project = req.body;
  if (studentId) {
    if (project) {
      try {
        const queryResults = await pool.query(
          `INSERT INTO projects (owner, title, problem, solution, img, date, collaborators, sdgs, featured) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
          [
            studentId,
            project.title,
            project.problem,
            project.solution,
            project.img,
            project.date,
            project.collaborators,
            project.sdgs,
            project.featured,
          ]
        );
        res
          .status(200)
          .json({ message: 'Success', entry_id: queryResults?.rows[0]?.id });
      } catch (error) {
        res
          .status(500)
          .json({ message: `Couldn't save project on database! Try again!` });
      }
    }
  } else {
    res
      .status(500)
      .json({ message: `Couldn't save project on database! Try again!` });
  }
});

app.put('/students/:studentId', async function (req, res) {
  const { studentId } = req.params;
  const stud = req.body;
  if (studentId) {
    if (stud) {
      try {
        await pool.query(
          `UPDATE students SET first_name = $1, last_name = $2, gender = $3, stud_num = $4, email = $5, phone = $6, state = $7, bio = $8 WHERE id = $9`,
          [
            stud.first_name,
            stud.last_name,
            stud.gender,
            stud.stud_num,
            stud.email,
            stud.phone,
            stud.state,
            stud.bio,
            studentId,
          ]
        );
        res.status(200).json('Success');
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } else {
      res
        .status(500)
        .json({ message: 'No student information was found in the body!' });
    }
  } else {
    res.status(500).json({ message: 'No student id was provided!' });
  }
});

app.put('/changepassword', async function (req, res) {
  const { user_id, new_password } = req.body;
  if (user_id && new_password) {
    try {
      await pool.query(`UPDATE students SET password = $1 WHERE id = $2`, [
        new_password,
        user_id,
      ]);
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Fatal error! Couldn't change password!` });
    }
  } else {
    res
      .status(500)
      .json({ message: `No data fields were provided with the request` });
  }
});

app.get('/verifystudent', async function (req, res) {
  const { userEmail, userPwd } = req.query;

  if (userEmail && userPwd) {
    try {
      const result = await pool.query(
        `SELECT * FROM students WHERE email = $1`,
        [userEmail]
      );
      if (result.rowCount > 0) {
        const student = result.rows[0];
        if (student.password === userPwd) {
          res.json({
            authorised: true,
            message: 'Success',
            user_id: student.id,
            user_name: `${student.first_name} ${student.last_name}`,
          });
        }
      } else {
        res.status(200).json({
          authorised: false,
          message: 'No user with such a username found!',
          userId: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        authorised: false,
        message: 'An error occured!',
        userId: null,
      });
    }
  } else {
    res.status(200).json({
      authorised: false,
      message: 'No data was supplied to server!',
      userId: null,
    });
  }
});

app.get('/verifymentor', async function (req, res) {
  res.status(404).json({ message: `Error! Couldn't load data from server` });
});
app.get('/verifyadmin', async function (req, res) {
  res.status(404).json({ message: `Error! Couldn't load data from server` });
});

app.post('/createnotification', async function (req, res) {
  const notification = req.body;
  if (notification) {
    try {
      const queryResults = await pool.query(
        `INSERT INTO notifications (user_id, project_id, title, message, timestamp, read) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          notification.user_id,
          notification.project_id,
          notification.title,
          notification.message,
          notification.timestamp,
          notification.read,
        ]
      );
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      res.status(500).json({
        message: `Couldn't save notification on database! Try again!`,
      });
    }
  }
});

app.get('/notifications/:userId', async function (req, res) {
  const { userId } = req.params;
  if (userId) {
    try {
      const result = await pool.query(
        `SELECT * FROM notifications WHERE user_id = $1`,
        [userId]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(400).json({ message: `You dont have any notifications!` });
    }
  } else {
    res
      .status(500)
      .json({ message: `Error! Couldn't load notifications from server` });
  }
});

app.get('/unreadnotifications/:userId', async function (req, res) {
  const { userId } = req.params;
  if (userId) {
    try {
      const result = await pool.query(
        `SELECT * FROM notifications WHERE user_id = $1 AND read = false`,
        [userId]
      );
      res.status(200).json({ count: result.rowCount, message: 'Success' });
    } catch (error) {
      res.status(500).json({ count: 0, message: 'Fatal error!' });
    }
  } else {
    res.status(500).json({ count: 0, message: 'No user id was provided!' });
  }
});

app.put('/markallnotificationsread/:userId', async function (req, res) {
  const { userId } = req.params;
  if (userId) {
    try {
      const result = await pool.query(
        `UPDATE notifications SET read = true WHERE user_id = $1`,
        [userId]
      );
      res.status(200).json(result.rowCount);
    } catch (error) {
      res.status(500).json({ message: 'Error occured!' });
    }
  } else {
    res.status(500).json({ message: 'No user id provided' });
  }
});

app.delete('/clearallnotifications/:userId', async function (req, res) {
  const { userId } = req.params;
  if (userId) {
    try {
      await pool.query(`DELETE FROM notifications WHERE user_id = $1`, [
        userId,
      ]);
      res.status(200).json('Success');
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error! Couldn't delete data on server` });
    }
  } else {
    res
      .status(500)
      .json({ message: `Error! Couldn't delete data from server` });
  }
});

app.delete('/deleteonenotification', async function (req, res) {
  const { user_id, notification_id } = req.body;
  if (user_id && notification_id) {
    try {
      await pool.query(
        `DELETE FROM notifications WHERE id = $1 AND user_id = $2`,
        [notification_id, user_id]
      );
      res.status(200).json('Success');
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error! Couldn't delete data on server` });
    }
  } else {
    res
      .status(500)
      .json({ message: `Error! Couldn't delete notification from server` });
  }
});

if (process.env.NODE_ENV === 'production') {
  // set static folder to let our Express server know to serve our React project
  app.use(express.static('client/build'));
  //This piece of code is to keep our client side routing functional. This code essentially serves the index.html file on any unknown routes.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
