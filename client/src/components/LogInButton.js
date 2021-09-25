import React from 'react';
import { Button, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Fade from '@mui/material/Fade';
import { withRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import { withSnackbar } from 'notistack';
import HEADERS_DATA from '../components/headers_data';

function LogInButton(props) {
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
      props.changeHeaders(HEADERS_DATA.home);
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
          src={
            props.user.auth
              ? 'images/navbar/log_out.png'
              : 'images/navbar/log_in.png'
          }
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
            props.changeUser({
              auth: false,
              type: 'student',
              userId: '',
            });
          }}
          sx={{ color: 'primary.main' }}
        >
          <Avatar
            sx={{
              color: 'primary.main',
              bgcolor: 'primary.light',
              marginRight: '0.3rem',
            }}
          />
          Student
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.history.push('/login');
            handleClose();
            props.changeUser({
              auth: false,
              type: 'mentor',
              userId: '',
            });
          }}
          sx={{ color: 'primary.main' }}
        >
          <Avatar
            sx={{
              color: 'primary.main',
              bgcolor: 'primary.light',
              marginRight: '0.3rem',
            }}
          />
          Mentor
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.history.push('/login');
            handleClose();
            props.changeUser({
              auth: false,
              type: 'admin',
              userId: '',
            });
          }}
          sx={{ color: 'primary.main' }}
        >
          <Box
            component='img'
            src='/images/navbar/admin.png'
            sx={{ height: '1.5rem', marginRight: '1rem', marginLeft: '0.8rem' }}
            alt='projects'
          ></Box>
          <Typography>Admin</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default withRouter(withSnackbar(LogInButton));
