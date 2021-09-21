import React from 'react';
import { Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import moment from 'moment';
import USER_NOTIFICATIONS from '../../assets/data/userNotifications';

function AllNotifications(props) {
  if (props.user.userId) {
  } else {
    props.history.push('/');
  }
  return (
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
      <Box>
        {USER_NOTIFICATIONS.map((notification, index) => (
          <NotificationCard notification={notification} />
        ))}
      </Box>
    </Holder>
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
            Project Mission Impossible
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
        <Button size='small'>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default AllNotifications;

const Holder = styled.div`
  margin: 2rem;
`;
