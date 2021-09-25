import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { styled as mstyled } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Container,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { withRouter } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

function Profile(props) {
  /* const profileInfo = {
    id: props.user.userId,
    firstName: '',
    lastName: '',
    gender: '',
    studnum: 0,
    email: '',
    phone: 0,
    state: '',
    type: '',
    bio: '',
    img: '',
  };*/

  const [profileInfo, setProfileInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProfileInfo = async () => {
      const res = await fetch(`/${props.user.type}s/${props.user.userId}`);
      const body = await res.json();
      if (res.status !== 200) {
        setError(true);
      } else {
        setProfileInfo(body);

        setError(false);
      }
      setLoading(false);
    };
    getProfileInfo();
  }, []);

  const uploadHandler = async (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);

    try {
      alert('inside fetch');
      await fetch(`/uploadprofilephoto/${props.user.userId}`, data, {
        method: 'PUT',
      }).then((res) => {
        //alert(res);
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container
      sx={{
        backgroundImage: `url('/images/background/bg1.png')`,
        maxWidth: '100%',
        minHeight: '90vh',
        paddingBottom: '1rem',
      }}
    >
      <Holder>
        <Card>
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
                  <CardMedia
                    component='img'
                    src={profileInfo.img}
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
                    <label htmlFor='contained-button-file'>
                      <Input
                        accept='image/*'
                        id='contained-button-file'
                        multiple
                        type='file'
                        onChange={uploadHandler}
                      />
                      <Button
                        variant='contained'
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
                    variant='h6'
                    sx={{ marginTop: '0.7rem' }}
                  >{`${profileInfo.gender}`}</Typography>
                  <Typography variant='h6'>{`${props.user.type}`}</Typography>
                  <Typography variant='body1'>{`${profileInfo.email}`}</Typography>
                  <Typography variant='body1'>{`0${profileInfo.phone}`}</Typography>
                  <Typography
                    variant='body1'
                    sx={{ marginBottom: '0.7rem' }}
                  >{`${profileInfo.state}`}</Typography>
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
            <Button
              variant='contained'
              startIcon={<EditIcon />}
              sx={{ textTransform: 'none' }}
              onClick={() =>
                props.history.push({
                  pathname: '/editprofile',
                  state: {
                    data: profileInfo,
                  },
                })
              }
            >
              Edit profile
            </Button>
          </CardActions>
        </Card>
      </Holder>
    </Container>
  );
}
const Input = mstyled('input')({
  display: 'none',
});

/*const ProfileCard = (props) => {
  console.log(`profile: ${props.profileInfo}`);
  return (
    
  );
};*/

export default withRouter(Profile);

const Holder = styled.div`
  margin: 2rem;
  @media (max-width: 768px) {
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
