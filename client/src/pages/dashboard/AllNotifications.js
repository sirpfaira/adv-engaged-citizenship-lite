import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { Card, Container } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import moment from 'moment';
import { withSnackbar } from 'notistack';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
//import USER_NOTIFICATIONS from '../../assets/data/userNotifications';

function AllNotifications(props) {
  if (props.user.user_id) {
    const markAsRead = async () => {
      try {
        await fetch(`/markallnotificationsread/${props.user.user_id}`, {
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
  const [error, setError] = useState({ state: false, message: '' });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteAll = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    const getNotifications = async () => {
      const res = await fetch(`/notifications/${props.user.user_id}`);
      const body = await res.json();
      if (res.status !== 200) {
        setError({
          ...error,
          state: true,
          message: body.message,
        });
      } else {
        //.slice() protects the original array from being modified
        //because it create a copy of the array prior to sorting.
        const sortedNotifications = body
          .slice()
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        //console.log(sortedNotifications);
        setMyNotifications(sortedNotifications);
        setError(false);
      }
      setLoading(false);
    };
    getNotifications();
  }, []);

  const clearAllNotifications = async () => {
    if (myNotifications.length > 0) {
      const res = await fetch(`/clearallnotifications/${props.user.user_id}`, {
        method: 'DELETE',
      });
      const body = await res.json();
      if (res.status !== 200) {
        props.enqueueSnackbar(body.message, {
          variant: 'error',
        });
      } else {
        props.enqueueSnackbar('Cleared all notifications!', {
          variant: 'success',
        });
      }
    } else {
      props.enqueueSnackbar('No notifications to delete!', {
        variant: 'error',
      });
    }
    handleClose();
  };

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            minWidth: '100%',
          }}
        >
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '2rem',
              marginBottom: '0.7rem',
            }}
          >
            My Notifications
          </Typography>
          <Button sx={{ textTransform: 'none' }} onClick={handleDeleteAll}>
            <Typography
              sx={{
                fontWeight: '600',
                marginBottom: '0.7rem',
                textDecoration: 'underline',
              }}
            >
              Clear All
            </Typography>
          </Button>
        </Box>
        {loading ? (
          <Loading />
        ) : error.state ? (
          <Error message={error.message} />
        ) : (
          <Box>
            {myNotifications.length > 0 ? (
              myNotifications.map((notification, index) => (
                <NotificationCard notification={notification} key={index} />
              ))
            ) : (
              <Typography sx={{ fontStyle: 'italic' }}>
                --- You don't have any notifications yet! Check again later!
              </Typography>
            )}
          </Box>
        )}
      </Holder>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Delete all?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            If you perform this action all your notifications will be deleted
            and you will not be able to recover them.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={clearAllNotifications} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

const NotificationCard = ({ notification, handleDeleteOne }) => {
  const getElapsedTime = (timestamp) => {
    var given = moment(timestamp, 'YYYY-MM-DD HH:mm');
    var current = moment();
    const minutes = Math.floor(
      moment.duration(current.diff(given)).asMinutes()
    );
    //console.log(minutes);
    if (minutes > 518400) {
      const years = Math.floor(minutes / 518400);
      return `${years} ${years === 1 ? ` year ago` : ` years ago`}`;
    } else if (minutes > 43200) {
      const months = Math.floor(minutes / 43200);
      return `${months} ${months === 1 ? ` month ago` : ` months ago`}`;
    } else if (minutes > 1440) {
      const days = Math.floor(minutes / 1440);
      return `${days} ${days === 1 ? ` day ago` : ` days ago`}`;
    } else if (minutes > 60) {
      const hrs = Math.floor(minutes / 60);
      return `${hrs} ${hrs === 1 ? ` hr ago` : ` hrs ago`}`;
    } else {
      return `${minutes} ${minutes === 1 ? ` min ago` : ` mins ago`}`;
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
        <Button
          size='small'
          startIcon={<DeleteIcon />}
          onClick={handleDeleteOne}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default withSnackbar(AllNotifications);

const Holder = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
`;
