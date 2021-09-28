import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Box, IconButton } from '@mui/material';
import GroupIcon from '@mui/icons-material/GroupOutlined';
import YearIcon from '@mui/icons-material/EventNote';
import Typography from '@mui/material/Typography';
import { truncateStr } from '../../services/utils';

export default function ProjectCard({ project }) {
  return (
    <Card>
      <CardMedia
        component='img'
        height='140'
        image={project.img}
        alt='featured project'
      />
      <CardContent
        sx={{
          padding: '1rem 0.7rem 0px 0.7rem',
        }}
      >
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          sx={{ textAlign: 'center', padding: '0.7rem' }}
        >
          {project.title}
        </Typography>

        <Typography variant='body2' sx={{ padding: '0.7rem' }}>
          {truncateStr(project.problem + project.solutrion, 300)}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '0.4rem',
            paddingBottom: '0px',
            alignItems: 'center',
          }}
        >
          <IconButton>
            <YearIcon />
          </IconButton>
          <Typography variant='body2' sx={{ fontWeight: '600' }}>
            {project.date.substring(0, 4)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <IconButton>
            <GroupIcon />
          </IconButton>
          <Typography variant='body2' sx={{ fontWeight: '600' }}>
            {project.collaborators.join(' | ')}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          marginTop: '0px',
          padding: '0.5rem 0.7rem 1rem 0.7rem',
        }}
      >
        <Button size='small'>Share</Button>
        <Button size='small'>Read More</Button>
      </CardActions>
    </Card>
  );
}
