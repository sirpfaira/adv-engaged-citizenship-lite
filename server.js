const express = require('express');
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors({ origin: true, methods: ['GET', 'POST'], credentials: true }));
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
      res.status(500).json('No data found!');
    }
  } catch (error) {
    res.status(500).json('error occured');
  }
});

app.get('/testimonials', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials');
    if (result.rowCount > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(500).json('No data found!');
    }
  } catch (error) {
    res.status(500).json('error occured');
  }
});

app.get('/team', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team');
    if (result.rowCount > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(500).json('No data found!');
    }
  } catch (error) {
    res.status(500).json('error occured');
  }
});

app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    if (result.rowCount > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(500).json('No data found!');
    }
  } catch (error) {
    res.status(500).json('error occured');
  }
});

app.get('/students/:studentId', async function (req, res) {
  const { studentId } = req.params;
  if (studentId) {
    try {
      const result = await pool.query(
        `SELECT * FROM students WHERE id = ${Number(studentId)}`
      );
      if (result.rowCount > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(500).json('No data found!');
      }
    } catch (error) {
      res.status(500).json('error occured');
    }
  } else {
    res.status(500).json('error occured');
  }
});

app.put('/students/:studentId', async function (req, res) {
  const { studentId } = req.params;
  const stud = req.body;
  if (studentId) {
    if (stud) {
      try {
        await pool.query(
          `UPDATE students SET firstname = $1, lastname = $2, gender = $3, studnum = $4, email = $5, phone = $6, state = $7, bio = $8, password = $9 WHERE id = $10;`,
          [
            stud.firstname,
            stud.lastname,
            stud.gender,
            stud.studnum,
            stud.email,
            stud.phone,
            stud.state,
            stud.bio,
            stud.password,
            studentId,
          ]
        );
        res.status(200).json('Sucess');
      } catch (error) {
        res.status(500).json('An error occured');
      }
    } else {
      res.status(500).json('No student information was found in the body!');
    }
  } else {
    res.status(500).json('No student id was provided!');
  }
});

app.get('/verifystudent', async function (req, res) {
  const { userEmail, userPwd } = req.query;

  if (userEmail && userPwd) {
    try {
      const result = await pool.query(
        `SELECT * FROM students WHERE email = '${userEmail}'`
      );
      if (result.rowCount > 0) {
        const student = result.rows[0];
        if (student.password === userPwd) {
          res.json({
            authorised: true,
            message: 'Success',
            userId: student.id,
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

app.get('/notifications/:userId', async function (req, res) {
  const { userId } = req.params;
  //console.log(`userID: ${userId}`);
  if (userId) {
    try {
      const result = await pool.query(
        `SELECT * FROM notifications WHERE user_id = ${Number(userId)}`
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json('error occured');
    }
  } else {
    res.status(500).json('error occured');
  }
});

app.get('/unreadnotifications/:userId', async function (req, res) {
  const { userId } = req.params;
  if (userId) {
    try {
      const result = await pool.query(
        `SELECT * FROM notifications WHERE user_id = ${Number(
          userId
        )} AND read = false`
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
        `UPDATE notifications SET read = true WHERE user_id = ${Number(userId)}`
      );
      res.status(200).json(result.rowCount);
    } catch (error) {
      res.status(500).json('Error occured!');
    }
  } else {
    res.status(500).json('No user id provided');
  }
});

app.delete('/clearallnotifications/:userId', async function (req, res) {
  const { userId } = req.params;
  if (userId) {
    try {
      await pool.query(
        `DELETE FROM notifications WHERE user_id = ${Number(userId)}`
      );
      res.status(200).json('Sucess');
    } catch (error) {
      res.status(500).json('error occured');
    }
  } else {
    res.status(500).json('error occured');
  }
});

app.get('/', (req, res) => {
  res
    .status(200)
    .json('You have hit the Advancing Engaged Citizenship server!');
});

app.post('/', (req, res) => {
  //console.log(req.body);
  res
    .status(200)
    .send(
      `I received your POST request. This is what you sent me: ${req.body.post}`
    );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
