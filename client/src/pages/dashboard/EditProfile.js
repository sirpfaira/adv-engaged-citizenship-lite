import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Container,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { withSnackbar } from 'notistack';
import provinces from '../../assets/data/sa-provinces';

const EditStudentProfile = (props) => {
  const data = props.history.location.state?.data;
  const [values, setValues] = useState({
    firstname: data.firstname || '',
    lastname: data.lastname || '',
    gender: data.gender || 'male',
    studnum: data.studnum || null,
    email: data.email || '',
    phone: data.phone || null,
    state: data.state || '',
    bio: data.bio || '',
    oldpwd: '',
    newpwd: '',
    password: data.password,
  });

  const saveProfileInfo = () => {
    if (
      values.firstname &&
      values.lastname &&
      values.gender &&
      values.studnum &&
      values.email &&
      values.phone &&
      values.state
    ) {
      if (values.oldpwd && values.newpwd) {
        if (values.oldpwd === values.password) {
          setValues({
            ...values,
            password: values.newpwd,
          });
          sendInfoToServer();
        } else {
          props.enqueueSnackbar('Password is incorrect!', {
            variant: 'error',
          });
        }
      } else {
        sendInfoToServer();
      }
    } else {
      props.enqueueSnackbar('Please provide all fields', { variant: 'error' });
    }
  };

  const sendInfoToServer = async () => {
    const res = await fetch(`/${props.user.role}s/${props.user.userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const body = await res.json();
    if (res.status !== 200) {
      props.enqueueSnackbar(body, {
        variant: 'error',
      });
    } else {
      props.enqueueSnackbar('Saved sucessfully!', {
        variant: 'success',
      });
      //console.log(values);
      props.history.push('/myprofile');
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container
      sx={{
        backgroundImage: `url('/images/background/bg1.png')`,
        maxWidth: '100%',
        minHeight: '90vh',
        paddingBottom: '1rem',
        marginTop: '2.5rem',
      }}
    >
      <form autoComplete='off' noValidate {...props}>
        <Card>
          <CardHeader
            subheader='You must fill in all the required fields. The password fields are optional, only fill them if you really want change your password.'
            title='Profile'
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='First name'
                  name='firstname'
                  onChange={handleChange}
                  required
                  value={values.firstname}
                  variant='outlined'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Last name'
                  name='lastname'
                  onChange={handleChange}
                  required
                  value={values.lastname}
                  variant='outlined'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Gender'
                  name='gender'
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.gender}
                  variant='outlined'
                >
                  <option key='male' value='male'>
                    Male
                  </option>
                  <option key='female' value='female'>
                    Female
                  </option>
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Student number'
                  name='studnum'
                  onChange={handleChange}
                  type='number'
                  required
                  value={values.studnum}
                  variant='outlined'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Email Address'
                  name='email'
                  onChange={handleChange}
                  required
                  value={values.email}
                  variant='outlined'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Phone Number'
                  name='phone'
                  onChange={handleChange}
                  type='number'
                  required
                  value={values.phone}
                  variant='outlined'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Select Province'
                  name='state'
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                  variant='outlined'
                >
                  {provinces.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  inputProps={{
                    autocomplete: 'new-password',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                  label='Old password'
                  name='oldpwd'
                  onChange={handleChange}
                  type='password'
                  value={values.oldpwd}
                  variant='outlined'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  inputProps={{
                    autocomplete: 'new-password',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                  label='New Password'
                  name='newpwd'
                  onChange={handleChange}
                  type='password'
                  value={values.newpwd}
                  variant='outlined'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  multiline
                  fullWidth
                  label='Bio'
                  name='bio'
                  onChange={handleChange}
                  value={values.bio}
                  variant='outlined'
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Button
              color='primary'
              variant='contained'
              sx={{ marginRight: '1rem' }}
              endIcon={<CancelIcon />}
              onClick={() => {
                props.enqueueSnackbar('Changes discarded!', {
                  variant: 'error',
                });
                props.history.push('/myprofile');
              }}
            >
              Cancel
            </Button>
            <Button
              color='primary'
              variant='contained'
              endIcon={<SendIcon />}
              onClick={saveProfileInfo}
            >
              Save
            </Button>
          </Box>
        </Card>
      </form>
    </Container>
  );
};

export default withSnackbar(EditStudentProfile);
