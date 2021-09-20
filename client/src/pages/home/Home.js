import React from 'react';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import Content from '../../components/home/Content';
import Footer from '../../components/home/Footer';
//import theme from '../../themes/theme';

function Home() {
  return (
    <MainContainer>
      <Content />
      <Divider orientation='horizontal' flexItem border-color='primary.grey' />
      <Footer />
    </MainContainer>
  );
}

export default Home;

const MainContainer = styled.div`
  min-height: 90vh;
  margintop: 1rem;
  overflow-x: hidden;
`;
