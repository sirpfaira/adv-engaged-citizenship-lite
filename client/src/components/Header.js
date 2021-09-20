import React from 'react';
import styled from 'styled-components';
import theme from '../themes/theme';
import { flexbox } from '@mui/system';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  Stack,
  Divider,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AboutIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LOGO_ICON from '../assets/images/su_100_white.png';
import HEADERS_DATA from './headers_data';
import NEWS_ICON from '../assets/images/news.png';
import REGISTER_ICON from '../assets/images/sign_up.png';
import EVENTS_ICON from '../assets/images/events.png';
import PROJECTS_ICON from '../assets/images/projects.png';
import LOGIN_ICON from '../assets/images/log_in.png';
import LogInButton from './LogInButton';

function Header({ aunthenticated, user }) {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '100%',
        }}
      >
        <LogoImage />
        <PageTitle />
        <DesktopMenuItems />
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
            src={LOGIN_ICON}
            alt='projects'
          ></Box>
          <LogInButton />
        </Box>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar
        sx={{
          display: flexbox,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            {...{
              edge: 'start',
              color: 'inherit',
              'aria-label': 'menu',
              'aria-haspopup': 'true',
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            {...{
              anchor: 'left',
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            <MobileMenuItems />
          </Drawer>

          <LogoImage />
        </Box>
        {/* <PageTitle />*/}

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
          }}
        >
          <Box
            component='img'
            sx={{ height: '1.2rem', marginLeft: '0.3rem' }}
            src={LOGIN_ICON}
            alt='login'
          ></Box>
          <LogInButton />
        </Box>
      </Toolbar>
    );
  };

  const MobileMenuItems = () => {
    return (
      <Stack sx={{ marginTop: '1rem' }}>
        <Typography
          sx={{
            marginRight: '1rem',
            marginLeft: '1rem',
            fontWeight: 800,
            textDecoration: 'underline',
            color: 'primary.main',
          }}
        >
          Menu
        </Typography>
        {HEADERS_DATA.map(({ label, href, id }) => (
          <Box key={label}>
            <Link
              {...{
                component: RouterLink,
                to: href,
                color: 'inherit',
                style: { textDecoration: 'none', autoCapitalize: 'none' },
                key: label,
              }}
            >
              <MenuItem
                sx={{
                  color: 'primary.main',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  sx={{ mr: '0.5rem' }}
                >
                  <GetMenuIcon id={id} />
                </IconButton>
                <Typography>{label}</Typography>
              </MenuItem>
            </Link>
          </Box>
        ))}
      </Stack>
    );
  };

  const GetMenuIcon = ({ id }) => {
    switch (id) {
      case 1:
        return (
          <Box
            component='img'
            sx={{ height: '1.2rem' }}
            src={PROJECTS_ICON}
            alt='projects'
          ></Box>
        );
      case 2:
        return (
          <Box
            component='img'
            sx={{ height: '1.2rem' }}
            src={NEWS_ICON}
            alt='news'
          ></Box>
        );
      case 3:
        return (
          <Box
            component='img'
            sx={{ height: '1.2rem' }}
            src={EVENTS_ICON}
            alt='events'
          ></Box>
        );
      case 4:
        return (
          <Box
            component='img'
            sx={{ height: '1.3rem' }}
            src={REGISTER_ICON}
            alt='register'
          ></Box>
        );
      case 5:
        return <AboutIcon />;
      default:
        return <MenuIcon />;
    }
  };

  const PageTitle = () => {
    return (
      <Box sx={{ marginLeft: '1rem', marginRight: '1rem', flexGrow: 1 }}>
        <Typography>Advancing Engaged Citizenship</Typography>
      </Box>
    );
  };

  const DesktopMenuItems = () => {
    return (
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          marginLeft: '1rem',
          marginRight: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
        divider={
          <Divider
            orientation='vertical'
            flexItem
            border-color='primary.grey'
          />
        }
      >
        {HEADERS_DATA.map(({ label, href }) => (
          <Box key={label}>
            <Button
              style={{ textTransform: 'none' }}
              {...{
                key: label,
                color: 'inherit',
                to: href,
                component: RouterLink,
              }}
            >
              {label}
            </Button>
          </Box>
        ))}
      </Stack>
    );
  };

  const LogoImage = () => {
    return (
      <Box
        sx={{
          margin: '1rem',
          padding: '0.2rem',
        }}
      >
        <img src={LOGO_ICON} alt='Website Logo' height='45rem' width='auto' />
      </Box>
    );
  };

  return (
    <header>
      <Nav>
        <AppBar sx={{ position: 'fixed', top: '0', width: '100%' }}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </Nav>
      <Offset />
    </header>
  );
}

export default Header;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 100wh;
  padding: 0 36px;
`;

const Offset = styled.div`
  min-height: 4rem;
`;
