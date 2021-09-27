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
    first_name: data.first_name || '',
    last_name: data.last_name || '',
    gender: data.gender || 'male',
    stud_num: data.stud_num || null,
    email: data.email || '',
    phone: data.phone || null,
    state: data.state || '',
    bio: data.bio || '',
  });

  const saveProfileInfo = () => {
    if (
      values.first_name &&
      values.last_name &&
      values.gender &&
      values.stud_num &&
      values.email &&
      values.phone &&
      values.state
    ) {
      sendInfoToServer();
    } else {
      props.enqueueSnackbar('Please provide all fields', { variant: 'error' });
    }
  };

  const sendInfoToServer = async () => {
    const res = await fetch(`/${props.user.role}s/${props.user.user_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const body = await res.json();
    if (res.status !== 200) {
      /* props.enqueueSnackbar(body.message, {
        variant: 'error',
      });*/
      alert(JSON.stringify(body));
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
            subheader='You must fill in all the fields.'
            title='Profile'
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='First name'
                  name='first_name'
                  onChange={handleChange}
                  required
                  value={values.first_name}
                  variant='outlined'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label='Last name'
                  name='last_name'
                  onChange={handleChange}
                  required
                  value={values.last_name}
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
                  name='stud_num'
                  onChange={handleChange}
                  type='number'
                  required
                  value={values.stud_num}
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
                  multiline
                  required
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
