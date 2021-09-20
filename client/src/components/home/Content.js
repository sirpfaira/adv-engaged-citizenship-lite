//import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Grid,
  Divider,
  Container,
  Button,
  /*Card,
	CardActions,
	CardContent,
	CardMedia,*/
} from '@mui/material';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';
import PROJECTS from '../../assets/data/projects.json';
import BG from '../../assets/images/bg.jpg';
import Testimonials from './Testimonials';
import Team from './Team';
import HOME_PAGE_DATA from '../../assets/data/homePageData.json';
import theme from '../../themes/theme';

const Content = () => {
  return (
    <Container
      sx={{
        backgroundImage: `url(${BG})`,
        maxWidth: '100%',
        minHeight: '90vh',
        paddingBottom: '1rem',
      }}
    >
      <Stack direction='column' sx={{ margin: '4rem 1rem 2rem 1rem' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography
                sx={{
                  fontWeight: '600',
                  fontSize: '2.4rem',
                  textAlign: 'center',
                }}
              >
                Advancing Engaged Citizenship
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  padding: '1rem',
                }}
              >
                <Typography>
                  A platform where students can journey with a team of advisors
                  to assist with the innovation of project ideas, during the
                  conceptualization and implementation phase. It allows students
                  to complete a standard template with prompts to answer key
                  questions. It also allows university staff to provide feedback
                  and mentorship via the platform.
                </Typography>
                <Join>
                  <Button
                    variant='contained'
                    sx={{ margin: '0.7rem', textTransform: 'none' }}
                  >
                    {`Join Now >>>`}
                  </Button>
                </Join>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1, marginTop: '3rem' }}>
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '2.4rem',
            }}
          >
            Featured Projects
          </Typography>
          <Divider
            orientation='horizontal'
            flexItem
            border-color='primary.grey'
          />
          <Grid container spacing={2} sx={{ marginTop: '1.3rem' }}>
            {PROJECTS.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.name}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          <Testimonials data={HOME_PAGE_DATA.testimonials} />
        </Box>
        <Box>
          <Team data={HOME_PAGE_DATA.team} />
        </Box>
      </Stack>
    </Container>
  );
};

export default Content;

const Join = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
`;
