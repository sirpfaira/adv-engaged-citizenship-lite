import * as React from 'react';
import {Grid, Box, Typography, Container, Link} from '@mui/material';
import FOOTER_ICON from '../../assets/images/su_centenial_logo.png';

function Copyright() {
  return (
    <Typography variant='body2'>
      {'Copyright © '}
      <Link
        color='inherit'
        href='https://github.com/LawrenceBaatjies/Advancing-Engaged-Citizenship'
      >
        The A Team
      </Link>
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box component='footer' sx={{height: '4rem', display: "flex", flexDirection: "row"}}>
      <Grid container spacing={2} sx={{
            backgroundColor: (theme) => theme.palette.grey[200],
          }}>
        
          <Grid item xs={12} md={6} sx={{ marginLeft: '1rem', marginRight: '1rem', flexGrow: 1 }}>
            <img src={FOOTER_ICON} alt='Footer' height='100%' width='auto' />
          </Grid>
          <Grid item xs={12} md={6} sx={{flexGrow: 1}}>
          <Box sx={{display: "flex", flexDirection: "column"}}>
            <Typography variant='body1'>Advancing Engaged Citizenship</Typography>
            <Copyright />
            </Box>
          </Grid>
        
      </Grid>
    </Box>
  );
}
