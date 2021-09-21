import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
import FormLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
//import FormLabel from '@mui/material/FormLabel';
import { useLocation } from 'react-router-dom';
//import theme from '../../themes/theme';
import { withSnackbar } from 'notistack';

const LogIn = (props) => {
  const { search } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [error, setError] = useState('');
  const [type, setType] = useState(search.replace('?', '') || 'student');

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

  const handleSubmit = (event) => {
    event.preventDefault();
    let aunthenticated = authenticateUser(email, password);

    if (aunthenticated) {
      props.changeUser({ auth: true, type: 'student', userId: email });
      setEmail('');
      setPassword('');
      props.history.push('/dashboard');
    }
  };

  const authenticateUser = (userEmail, userPwd) => {
    const error = 'Invalid user email or password';
    if (userEmail && userPwd) {
      if (userEmail === 'user' && userPwd === 'user') {
        //setError('');
        props.enqueueSnackbar('Logged in sucessfully!', { variant: 'success' });
        return true;
      } else {
        //setError('Invalid user email or password');
        props.enqueueSnackbar(error, { variant: 'error' });
        return false;
      }
    } else {
      //setError('Please provide all fields');
      props.enqueueSnackbar(error, { variant: 'error' });
      return false;
    }
  };

  return (
    <>
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
    </>
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
