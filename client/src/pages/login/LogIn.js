import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { withSnackbar } from 'notistack';
import HEADERS_DATA from '../../components/headers_data';

const LogIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(props.user.type || 'student');

  const handleEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const aunthenticated = await authenticateUser(email, password);

    if (aunthenticated) {
      //props.changeUser({ auth: true, type: type, userId: email });
      setEmail('');
      setPassword('');
      props.changeHeaders(HEADERS_DATA[type]);
      props.history.push('/dashboard');
    }
  };

  const authenticateUser = async (userEmail, userPwd) => {
    if (userEmail && userPwd) {
      const res = await fetch(
        `/verify${type}?userEmail=${userEmail}&userPwd=${userPwd}`
      );
      const body = await res.json();
      if (res.status !== 200) {
        props.enqueueSnackbar(body.message, {
          variant: 'error',
        });
        return false;
      } else {
        if (body.authorised) {
          props.changeUser({ auth: true, type: type, userId: body.userId });
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
            {`${type
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
            {/* <Typography
              variant='body2'
              color='primary.error'
              sx={{ textAlign: 'center' }}
            >
              {error}
           </Typography>*/}

            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={handleEmail}
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
              value={password}
              onChange={handlePassword}
            />
            <RadioButtons type={type} handleChange={handleChange} />
            {/*<FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />*/}
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

const RadioButtons = ({ type, handleChange }) => {
  return (
    <FormControl component='fieldset'>
      {/*<FormLabel component='legend'>Gender</FormLabel>*/}
      <RadioGroup
        row
        aria-label='user_type'
        name='controlled-radio-buttons-group'
        value={type}
        onChange={handleChange}
      >
        <FormControlLabel value='student' control={<Radio />} label='Student' />
        <FormControlLabel value='mentor' control={<Radio />} label='Mentor' />
        <FormControlLabel value='admin' control={<Radio />} label='Admin' />
      </RadioGroup>
    </FormControl>
  );
};

export default withSnackbar(LogIn);
