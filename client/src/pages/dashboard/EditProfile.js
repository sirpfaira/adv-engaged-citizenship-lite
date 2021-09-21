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
} from '@mui/material';
import provinces from '../../assets/data/sa-provinces';

const EditStudentProfile = (props) => {
  const [values, setValues] = useState({
    firstName: 'Simba',
    lastName: 'Pfaira',
    email: 'simbapfaira@cyf-sa.io',
    phone: '021 (24) 87994',
    state: 'Capetown',
    country: 'South Africa',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete='off' noValidate {...props}>
      <Card>
        <CardHeader subheader='The information can be edited' title='Profile' />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText='Please specify the first name'
                label='First name'
                name='firstName'
                onChange={handleChange}
                required
                value={values.firstName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Last name'
                name='lastName'
                onChange={handleChange}
                required
                value={values.lastName}
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
                label='Country'
                name='country'
                onChange={handleChange}
                required
                value={values.country}
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
          >
            Cancel
          </Button>
          <Button color='primary' variant='contained'>
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default EditStudentProfile;
