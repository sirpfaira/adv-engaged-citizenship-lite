import { useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  Divider,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
//import CancelIcon from '@mui/icons-material/Cancel';

const Settings = (props) => {
  const [values, setValues] = useState({
    oldpwd: '',
    newpwd: '',
    newpwd2: '',
    password: '',
    sms: true,
    phone: false,
    email: true,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckbox = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  const savePassword = () => {};
  const saveCommPrefs = () => {};
  return (
    <MainContainer>
      <PasswordContainer>
        <PasswordSection
          savePassword={savePassword}
          handleChange={handleChange}
          values={values}
        />
      </PasswordContainer>
      <CommContainer>
        <CommunicationSection
          saveCommPrefs={saveCommPrefs}
          handleCheckbox={handleCheckbox}
          values={values}
        />
      </CommContainer>
    </MainContainer>
  );
};

export default Settings;

const PasswordContainer = styled.div`
  margin-top: 1rem;
  margin-right: 2rem;
  width: 90%;
  @media (min-width: 768px) {
    margin-left: 1rem;
    margin-right: 1rem;
    width: 45%;
  }
`;
const CommContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 90%;
  margin-right: 2rem;
  @media (min-width: 768px) {
    margin-top: 1rem;
    margin-right: 1rem;
    width: 45%;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  margin-right: 1rem;
  background-image: url('/images/background/bg1.png');
  width: 100%;
  min-height: 90vh;
  padding-bottom: 1rem;
  margin-top: 2rem;
  overflow-x: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const PasswordSection = ({ savePassword, handleChange, values }) => {
  return (
    <Box
      sx={{
        boxShadow: 3,
        padding: '1rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h5' sx={{ textAlign: 'center' }}>
        Change your password
      </Typography>
      <Divider
        orientation='horizontal'
        flexItem
        width='100%'
        border-color='primary.grey'
        sx={{ marginBottom: '1rem' }}
      />
      <TextField
        fullWidth
        inputProps={{
          autocomplete: 'new-password',
          form: {
            autocomplete: 'off',
          },
        }}
        label='Current password'
        name='oldpwd'
        onChange={handleChange}
        type='password'
        value={values.oldpwd}
        variant='outlined'
      />
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
        sx={{ marginTop: '1rem' }}
      />
      <TextField
        fullWidth
        inputProps={{
          autocomplete: 'new-password',
          form: {
            autocomplete: 'off',
          },
        }}
        label='Repeat New Password'
        name='newpwd2'
        onChange={handleChange}
        type='password'
        value={values.newpwd2}
        variant='outlined'
        sx={{ marginTop: '1rem' }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          width: '100%',
          marginTop: '1.2rem',
        }}
      >
        <Button
          color='primary'
          variant='contained'
          endIcon={<SendIcon />}
          onClick={savePassword}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

const CommunicationSection = ({ saveCommPrefs, handleCheckbox, values }) => {
  return (
    <Box
      sx={{
        boxShadow: 3,
        padding: '1rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h5' sx={{ textAlign: 'center' }}>
        Communication preferences
      </Typography>
      <Divider
        orientation='horizontal'
        flexItem
        width='100%'
        border-color='primary.grey'
        sx={{ marginBottom: '1rem' }}
      />

      <FormGroup>
        <Box
          sx={{
            padding: '1rem',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexFlow: 'wrap',
            alignItems: 'center',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                name='phone'
                checked={values.phone}
                onChange={handleCheckbox}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label='Phone'
          />

          <FormControlLabel
            control={
              <Checkbox
                name='email'
                checked={values.email}
                onChange={handleCheckbox}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label='Email'
          />
          <FormControlLabel
            control={
              <Checkbox
                name='sms'
                checked={values.sms}
                onChange={handleCheckbox}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label='SMS'
          />
        </Box>
      </FormGroup>

      <Divider
        orientation='horizontal'
        flexItem
        width='100%'
        border-color='primary.grey'
        sx={{ marginBottom: '0rem', marginTop: '1.5rem' }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          width: '100%',
          marginTop: '1.2rem',
        }}
      >
        <Button
          color='primary'
          variant='contained'
          endIcon={<SendIcon />}
          onClick={saveCommPrefs}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
