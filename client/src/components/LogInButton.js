import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Fade from '@mui/material/Fade';
import { withRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import LOGIN_ICON from '../assets/images/log_in.png';
import LOGOUT_ICON from '../assets/images/log_out.png';
import { withSnackbar } from 'notistack';

function LOgInButton(props) {
  // console.log(props);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (props.user.auth) {
      props.enqueueSnackbar('You have been logged out!', { variant: 'error' });
      props.changeUser({
        auth: false,
        type: '',
        userId: '',
      });
      props.history.push('/');
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'primary.light',
          marginRight: '1rem',
          marginLeft: '0px',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'row',
          padding: '0.2rem',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'text.secondary',
        }}
      >
        <Box
          component='img'
          sx={{
            height: '1.2rem',
            marginLeft: '0.3rem',
          }}
          src={props.user.auth ? LOGOUT_ICON : LOGIN_ICON}
          alt='projects'
        ></Box>
        <Button
          id='fade-button'
          aria-controls='fade-menu'
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{
            textTransform: 'none',
          }}
        >
          {props.user.auth ? 'Log out' : 'Log In'}
        </Button>
      </Box>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            props.history.push('/login?student');
            handleClose();
            /*props.changeUser({
              auth: true,
              type: 'student',
              userId: 'S1234',
            });*/
          }}
          sx={{ color: 'primary.main' }}
        >
          <Avatar
            sx={{
              color: 'primary.main',
              bgcolor: 'primary.light',
              marginRight: '0.3rem',
            }}
          />{' '}
          Student
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.history.push('/login?mentor');
            handleClose();
          }}
          sx={{ color: 'primary.main' }}
        >
          <Avatar
            sx={{
              color: 'primary.main',
              bgcolor: 'primary.light',
              marginRight: '0.3rem',
            }}
          />{' '}
          Mentor
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.history.push('/login?admin');
            handleClose();
          }}
          sx={{ color: 'primary.main' }}
        >
          <Avatar
            sx={{
              color: 'primary.main',
              bgcolor: 'primary.light',
              marginRight: '0.3rem',
            }}
          />{' '}
          Admin
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default withRouter(withSnackbar(LOgInButton));
