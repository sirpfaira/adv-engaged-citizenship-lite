import * as React from 'react';
import { Box, Typography, Link } from '@mui/material';
import styled from 'styled-components';
import theme from '../../themes/theme';

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

const Footer = () => {
  return (
    <Container>
      <FlexItem>
        <ImageContainer>
          <Image
            src='images/footer/footer_icon.png'
            alt='Footer'
            height='100%'
            width='auto'
          />
        </ImageContainer>
      </FlexItem>
      <FlexItem>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5'>Advancing Engaged Citizenship</Typography>
          <Typography variant='body2'>
            204521, Zoom St, Cape Town, South Africa
          </Typography>
          <Copyright />
        </Box>
      </FlexItem>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  display: flex;
  flex-direction: row};
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: ${theme.palette.primary.white};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FlexItem = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  flex-grow: 1;
`;

const ImageContainer = styled.div`
  width: 40%;
`;

const Image = styled.img``;
