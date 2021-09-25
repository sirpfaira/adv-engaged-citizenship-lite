import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { Card, Container } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import moment from 'moment';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
//import USER_NOTIFICATIONS from '../../assets/data/userNotifications';

function AllNotifications(props) {
  if (props.user.userId) {
    const markAsRead = async () => {
      try {
        await fetch(`/markallnotificationsread/${props.user.userId}`, {
          method: 'PUT',
        });
      } catch {
        alert('error!');
      }
    };
    markAsRead();
  } else {
    props.history.push('/');
  }

  const [refresh, setRefresh] = useState(false);
  const [myNotifications, setMyNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getNotifications = async () => {
      const res = await fetch(`/notifications/${props.user.userId}`);
      const body = await res.json();
      if (res.status !== 200) {
        setError(true);
      } else {
        //.slice() protects the original array from being modified
        //because it create a copy of the array prior to sorting.
        const sortedNotifications = body
          .slice()
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        console.log(sortedNotifications);
        setMyNotifications(sortedNotifications);
        setError(false);
      }
      setLoading(false);
    };
    getNotifications();
  }, []);

  return (
    <Container
      sx={{
        backgroundImage: `url('/images/background/bg1.png')`,
        width: '100%',
        minHeight: '100vh',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      }}
    >
      <Holder>
        <Typography
          sx={{
            fontWeight: '600',
            fontSize: '2rem',
            marginBottom: '0.7rem',
          }}
        >
          All Notifications
        </Typography>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <Box>
            {myNotifications.map((notification, index) => (
              <NotificationCard notification={notification} key={index} />
            ))}
          </Box>
        )}
      </Holder>
    </Container>
  );
}

const NotificationCard = ({ notification }) => {
  const getElapsedTime = (timestamp) => {
    //'2021-09-21 17:00'
    var given = moment(timestamp, 'YYYY-MM-DD HH:mm');
    var current = moment();
    const minutes = moment.duration(current.diff(given)).asMinutes();
    if (minutes > 518400) {
      return `${Math.floor(minutes / 518400)} years ago`;
    } else if (minutes > 43200) {
      return `${Math.floor(minutes / 43200)} months ago`;
    } else if (minutes > 1440) {
      return `${Math.floor(minutes / 1440)} days ago`;
    } else if (minutes > 60) {
      return `${Math.floor(minutes / 60)} hrs ago`;
    } else {
      return `${Math.floor(minutes)} mins ago`;
    }
  };

  return (
    <Card sx={{ minWidth: '90%', marginBottom: '2rem' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '100%',
          }}
        >
          <Typography variant='h6' component='div' sx={{ marginRight: '1rem' }}>
            {notification.title}
          </Typography>
          <Typography variant='body2' component='div' color='primary.green'>
            {getElapsedTime(notification.timestamp)}
          </Typography>
        </Box>
        <Typography variant='body1' component='div'>
          {notification.message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default AllNotifications;

const Holder = styled.div`
  margin: 2rem;
`;
