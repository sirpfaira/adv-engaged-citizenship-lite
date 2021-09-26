import { useState, useEffect } from 'react';
import styled from 'styled-components';
//import { styled as mstyled } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Container,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

function Profile(props) {
  const [profileInfo, setProfileInfo] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const getProfileInfo = async () => {
      const res = await fetch(`/${props.user.role}s/${props.user.userId}`);
      const body = await res.json();
      if (res.status !== 200) {
        setError(true);
      } else {
        setProfileInfo(body);
        /*setProfileInfo({
          ...profileInfo,
          role: props.user.role,
        });*/

        setError(false);
      }
      //setLoading(false);
    };
    getProfileInfo();

    const getProjects = async () => {
      //setLoading(true);
      const res = await fetch(`/${props.user.role}s/${props.user.userId}`);
      const body = await res.json();
      if (res.status !== 200) {
      } else {
        setProjects(body);
      }
      setLoading(false);
    };
    getProjects();
  }, []);

  const openEditProfile = () => {
    history.push({
      pathname: '/editprofile',
      state: {
        data: profileInfo,
      },
    });
  };

  return (
    <Container
      sx={{
        backgroundImage: `url('/images/background/bg1.png')`,
        maxWidth: '100%',
        minHeight: '90vh',
        paddingBottom: '1rem',
        marginTop: '2rem',
      }}
    >
      <ProfileCard
        profileInfo={profileInfo}
        openEditProfile={openEditProfile}
      />
    </Container>
  );
}

const ProfileCard = ({ profileInfo, openEditProfile }) => {
  return (
    <Holder>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TopContainer>
              <Box
                sx={{
                  marginBottom: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <InitialsAvatar
                  name={`${profileInfo.firstname} ${profileInfo.lastname}`}
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    marginRight: '2rem',
                  }}
                >
                  <label htmlFor='contained-button-file'>
                    <Box
                      accept='image/*'
                      id='contained-button-file'
                      multiple
                      type='file'
                      name='image'
                      sx={{ display: 'none' }}
                    >
                      {' '}
                    </Box>
                    <Button
                      variant='outlined'
                      sx={{ textTransform: 'none' }}
                      component='span'
                    >
                      <AddAPhotoIcon sx={{ marginRight: '0.5rem' }} /> Upload
                    </Button>
                  </label>
                </Box>
              </Box>
              <Box sx={{ marginRight: '0.9rem' }}>
                <Typography gutterBottom variant='h4'>
                  {`${profileInfo.firstname} ${profileInfo.lastname}`}
                </Typography>
                <Divider
                  orientation='horizontal'
                  flexItem
                  width='100%'
                  border-color='primary.grey'
                />

                <Typography
                  variant='body1'
                  sx={{ marginTop: '0.7rem' }}
                >{`Gender:  ${profileInfo.gender}`}</Typography>
                <Typography variant='body1'>{`Role:  ${profileInfo.role}`}</Typography>
                <Typography variant='body1'>{`Email:  ${profileInfo.email}`}</Typography>
                <Typography variant='body1'>{`Student Number:  ${profileInfo.studnum}`}</Typography>
                <Typography variant='body1'>{`Phone Number:  0${profileInfo.phone}`}</Typography>
                <Typography
                  variant='body1'
                  sx={{ marginBottom: '0.7rem' }}
                >{`Province:  ${profileInfo.state}`}</Typography>
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
              {profileInfo.bio}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '0.7rem',
              }}
            >
              <Box
                sx={{
                  bgcolor: 'primary.frosting_cream',
                  color: 'primary.main',
                  height: '7rem',
                  width: '7rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '2rem',
                  boxShadow: 3,
                }}
              >
                <Typography variant='h4'>12</Typography>
                <Typography variant='body2'>Projects</Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: 'primary.frosting_cream',
                  color: 'primary.main',
                  height: '7rem',
                  width: '7rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: 3,
                }}
              >
                <Typography variant='h4'>3</Typography>
                <Typography variant='body2'>Competitions</Typography>
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
          <Button
            variant='outlined'
            startIcon={<EditIcon />}
            sx={{ textTransform: 'none' }}
            onClick={openEditProfile}
          >
            Edit profile
          </Button>
        </CardActions>
      </Card>
    </Holder>
  );
};

export default Profile;

const Holder = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0.5rem;
  }
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    h4 {
      font-size: 1.5rem;
    }
    h6 {
      font-size: 1rem;
    }
  }
`;

const InitialsAvatar = ({ name }) => {
  const arr = name.trim().split(' ');
  let string = '';
  for (let word of arr) {
    string += word.substring(0, 1);
  }
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '8rem',
        width: '8rem',
        borderRadius: '10%',
        marginRight: '2rem',
        marginBottom: '1.5rem',
      }}
    >
      <Typography sx={{ fontSize: '4rem', color: 'primary.light' }}>
        {string}
      </Typography>
    </Box>
  );
};
