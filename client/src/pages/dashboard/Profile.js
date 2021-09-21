import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function Profile(props) {
  const user = {
    email: 'spfaira@cyf.co.za',
    city: 'Capetown',
    country: 'South Africa',
    jobTitle: 'Full Stack Web Developer',
    name: 'Simba Pfaira',
    bio: 'Obsessed with books reading/writing | Free thinker | Digital Economy & Digital Labour Markets researcher',
    timezone: 'GTM+2',
  };

  return (
    <Holder>
      <Card {...props} sx={{ margin: '2rem' }}>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TopContainer>
              <Box sx={{ marginBottom: '1rem' }}>
                <CardMedia
                  component='img'
                  src='/images/user/avatar.png'
                  alt='user'
                  sx={{
                    height: '10rem',
                    width: 'auto',
                    marginBottom: '1rem',
                    marginRight: '1rem',
                    borderRadius: '50%',
                    border: `5px solid white`,
                  }}
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Button
                    sx={{
                      textTransform: 'none',
                      color: 'primary.main',
                    }}
                  >
                    <AddAPhotoIcon sx={{ marginRight: '0.3rem' }} />
                    Upload picture
                  </Button>
                </Box>
              </Box>
              <Box sx={{ marginRight: '0.9rem' }}>
                <Typography gutterBottom variant='h4'>
                  {user.name}
                </Typography>
                <Divider
                  orientation='horizontal'
                  flexItem
                  width='100%'
                  border-color='primary.grey'
                />

                <Typography
                  variant='h6'
                  sx={{ marginTop: '0.7rem' }}
                >{`${user.jobTitle}`}</Typography>
                <Typography variant='body1'>{`${user.email}`}</Typography>
                <Typography variant='body1'>
                  {`${user.city} ${user.country}`}
                </Typography>
                <Typography variant='body1' sx={{ marginBottom: '0.7rem' }}>
                  {`${moment().format('hh:mm A')} ${user.timezone}`}
                </Typography>
                <Divider
                  orientation='horizontal'
                  flexItem
                  width='100%'
                  border-color='primary.grey'
                />
              </Box>
            </TopContainer>

            <Typography
              variant='body1'
              sx={{
                width: { xs: '90%', md: '50%' },
                marginTop: '1rem',
                textAlign: 'center',
              }}
            >
              {user.bio}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box>
                <p>
                  Projects: <span>1</span>
                </p>
              </Box>
              <Box sx={{ marginLeft: '2rem' }}>
                Competitions: <span>0</span>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button onClick={() => props.history.push('/editprofile')}>
            Edit profile
          </Button>
        </CardActions>
      </Card>
    </Holder>
  );
}

export default Profile;

const Holder = styled.div`
  margin: 2rem;
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
