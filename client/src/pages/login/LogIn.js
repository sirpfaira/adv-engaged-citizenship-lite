import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { withSnackbar } from 'notistack';
import HEADERS_DATA from '../../components/headers_data';

const LogIn = (props) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    role: props.user.role || 'student',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const aunthenticated = await authenticateUser(
      values.email,
      values.password
    );

    if (aunthenticated) {
      props.changeHeaders(HEADERS_DATA[values.role]);
      props.history.push('/dashboard');
    }
  };

  const authenticateUser = async (userEmail, userPwd) => {
    if (userEmail && userPwd) {
      const res = await fetch(
        `/verify${values.role}?userEmail=${userEmail}&userPwd=${userPwd}`
      );
      const body = await res.json();
      if (res.status !== 200) {
        props.enqueueSnackbar(body.message, {
          variant: 'error',
        });
        return false;
      } else {
        if (body.authorised) {
          props.changeUser({
            auth: true,
            role: values.role,
            userId: body.userId,
          });
          props.enqueueSnackbar('Logged in sucessfully!', {
            variant: 'success',
          });
          return true;
        } else {
          props.enqueueSnackbar(body.message, {
            variant: 'error',
          });
          return false;
        }
      }
    } else {
      props.enqueueSnackbar('Please provide all fields', { variant: 'error' });
      return false;
    }
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
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {`${values.role
              .replace('?', '')
              .replace(/(\w)(\w*)/g, function (g0, g1, g2) {
                return g1.toUpperCase() + g2.toLowerCase();
              })} Log In`}
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={values.email}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={values.password}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label='Role'
              name='role'
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={values.role}
              variant='outlined'
              sx={{ marginTop: '0.9rem' }}
            >
              <option key='student' value='student'>
                Student
              </option>
              <option key='mentor' value='mentor'>
                Mentor
              </option>
              <option key='admin' value='admin'>
                Administrator
              </option>
            </TextField>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <FormLink href='#' variant='body2'>
                  Forgot password?
                </FormLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default withSnackbar(LogIn);
