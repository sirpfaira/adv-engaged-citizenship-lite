import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Button, Divider, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { useHistory } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { pascalCase } from '../../services/utils';

const Profile = (props) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [projects, setProjects] = useState([]);
  const [projectsId, setProjectsId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState({ state: false, message: '' });
  let history = useHistory();
  const user_role = props.user.role;

  useEffect(() => {
    const getProfileInfo = async () => {
      const res = await fetch(`/${user_role}s/${props.user.user_id}`);
      const body = await res.json();
      if (res.status !== 200) {
        setError({
          ...error,
          state: true,
          message: body.message,
        });
      } else {
        setProfileInfo(body);
        setError({
          ...error,
          state: false,
          message: '',
        });
      }
      //setLoading(false);
    };
    getProfileInfo();

    const getProjects = async () => {
      const res = await fetch(`/myprojects/${props.user.user_id}`);
      const body = await res.json();
      console.log(JSON.stringify(body));
      if (res.status !== 200) {
      } else {
        const newArr = body.map((el) => el.title);
        const newArr2 = body.map((el) => el.id);
        setProjects(newArr);
        setProjectsId(newArr2);
      }
      setLoading(false);
    };
    getProjects();
  }, [refresh]);

  const openEditProfile = () => {
    history.push({
      pathname: '/editprofile',
      state: {
        data: profileInfo,
      },
    });
  };

  const handleProjectView = (event) => {
    event.preventDefault();
    const projectTitle = event.currentTarget.getAttribute('data-id');
    //alert(projectTitle);
    history.push({
      pathname: '/viewproject',
      state: {
        project_id: projectTitle,
      },
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error.state ? (
        <Error message={error.message} />
      ) : (
        <MainContainer>
          <SubContainer>
            <MediaContainer>
              <Box
                sx={{
                  boxShadow: 3,
                  padding: '1rem',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TopContainer>
                  <PhotoContainer>
                    <InitialsAvatar
                      name={`${profileInfo.first_name} ${profileInfo.last_name}`}
                    />
                  </PhotoContainer>
                  <InfoContainer>
                    <Info
                      profileInfo={profileInfo}
                      openEditProfile={openEditProfile}
                      role={user_role}
                    />
                  </InfoContainer>
                </TopContainer>
              </Box>
            </MediaContainer>
            <BioContainer>
              <Box sx={{ boxShadow: 3, padding: '1rem' }}>
                <Bio bio={profileInfo.bio} />
                <Summary count={projects.length} />
              </Box>
            </BioContainer>
          </SubContainer>
          <ProjectsContainer>
            <Projects
              projects={projects}
              handleProjectView={handleProjectView}
              projectsId={projectsId}
            />
          </ProjectsContainer>
        </MainContainer>
      )}
    </>
  );
};

export default Profile;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  background-image: url('/images/background/bg1.png');
  width: 100%;
  min-height: 90vh;
  padding-bottom: 1rem;
  margin-top: 2rem;

  overflow-x: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
    margin-left: 1rem;
    margin-right: 1rem;
    align-items: flex-start;
  }
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    width: 75%;
  }
`;
const MediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;

  @media (min-width: 768px) {
    flex-direction: row;
    margin-left: 1rem;
    margin-right: 1rem;
    width: 60%;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;
const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 768px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;
const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-top: 1rem;
  @media (min-width: 768px) {
    width: 40%;
    margin-right: 1rem;
    margin-top: 0px;
  }
`;
const ProjectsContainer = styled.div`
  width: 90%;
  margin-top: 2rem;
  @media (min-width: 768px) {
    width: 22%;
  }
`;

const Projects = ({ projects, handleProjectView, projectsId }) => {
  //const array = ['Star wars', 'Despicable me'];

  return (
    <Box sx={{ width: '100%', boxShadow: 3, padding: '1rem' }}>
      <Typography variant='h5' sx={{ textAlign: 'center' }}>
        Projects
      </Typography>
      <Divider
        orientation='horizontal'
        flexItem
        width='100%'
        border-color='primary.grey'
        sx={{ marginBottom: '1rem' }}
      />
      {projects.length > 0 ? (
        projects.map((title, index) => (
          <ProjectTile
            title={title}
            key={index}
            handleProjectView={handleProjectView}
            projects={projects}
            projectsId={projectsId}
          />
        ))
      ) : (
        <Typography
          variant='body2'
          sx={{ textAlign: 'center', fontStyle: 'italic' }}
        >
          --- Nothing to show yet!
        </Typography>
      )}
    </Box>
  );
};

const Info = ({ profileInfo, openEditProfile, role }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <Typography gutterBottom variant='h4' sx={{ textAlign: 'center' }}>
        {`${profileInfo.first_name} ${profileInfo.last_name}`}
      </Typography>

      <Typography
        variant='body1'
        sx={{ textAlign: 'center' }}
      >{`Gender:  ${pascalCase(profileInfo.gender)}`}</Typography>
      <Typography
        variant='body1'
        sx={{ textAlign: 'center' }}
      >{`Role:  ${pascalCase(role)}`}</Typography>
      <Typography
        variant='body1'
        sx={{ textAlign: 'center' }}
      >{`Email:  ${profileInfo.email}`}</Typography>
      <Typography
        variant='body1'
        sx={{ textAlign: 'center' }}
      >{`Student Number:  ${profileInfo.stud_num}`}</Typography>
      <Typography
        variant='body1'
        sx={{ textAlign: 'center' }}
      >{`Phone Number:  0${profileInfo.phone}`}</Typography>
      <Typography
        variant='body1'
        sx={{ marginBottom: '0.7rem' }}
      >{`Province:  ${pascalCase(profileInfo.state).replace(
        '-',
        ' '
      )}`}</Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '1rem',
          width: '100%',
        }}
      >
        <UploadButton />
        <Button
          variant='outlined'
          startIcon={<EditIcon />}
          sx={{ textTransform: 'none', marginLeft: '1rem' }}
          onClick={openEditProfile}
        >
          Edit profile
        </Button>
      </Box>
    </Box>
  );
};

const Summary = ({ count }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1.5rem',
      }}
    >
      <Typography variant='h4'>Activity</Typography>
      <Divider
        orientation='horizontal'
        flexItem
        width='100%'
        border-color='primary.grey'
        sx={{ marginTop: '0.5rem' }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1.5rem',
        }}
      >
        <Box
          sx={{
            bgcolor: 'primary.frosting_cream',
            color: 'primary.main',
            height: '6.5rem',
            width: '6.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '2rem',
            boxShadow: 3,
          }}
        >
          <Typography variant='h4'>{count}</Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            Projects Created
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: 'primary.frosting_cream',
            color: 'primary.main',
            height: '6.5rem',
            width: '6.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 3,
          }}
        >
          <Typography variant='h4'>0</Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            Projects Approved
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Bio = ({ bio }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4'>Biography</Typography>
      <Divider
        orientation='horizontal'
        flexItem
        width='100%'
        border-color='primary.grey'
        sx={{ marginBottom: '1rem', marginTop: '1rem' }}
      />
      <Typography
        variant='body1'
        sx={{
          width: '70%',
          marginTop: '1rem',
          textAlign: 'center',
        }}
      >
        {bio}
      </Typography>
    </Box>
  );
};

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
        height: '10rem',
        width: '8rem',
        borderRadius: '10%',
        marginBottom: '1rem',
      }}
    >
      <Typography sx={{ fontSize: '4rem', color: 'primary.light' }}>
        {string}
      </Typography>
    </Box>
  );
};

const UploadButton = () => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
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
          <AddAPhotoIcon sx={{ marginRight: '0.5rem' }} /> Upload photo
        </Button>
      </label>
    </Box>
  );
};

const ProjectTile = ({ title, handleProjectView, projects, projectsId }) => {
  return (
    <Box
      sx={{
        boxShadow: 3,
        marginBottom: '1rem',
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography>{title}</Typography>
      <ViewButton
        data-id={projectsId[projects.indexOf(title)]}
        onClick={handleProjectView}
      >
        <Typography variant='body2' sx={{ marginRight: '0.4rem' }}>
          View
        </Typography>
        <PreviewIcon />
      </ViewButton>
    </Box>
  );
};

const ViewButton = styled.div`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }}`;
