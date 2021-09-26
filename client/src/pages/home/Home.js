import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import Content from '../../components/home/Content';
import Footer from '../../components/home/Footer';
import Loading from '../../components/Loading';
//import Settings from '../dashboard/Settings';
//import theme from '../../themes/theme';
import HEADERS_DATA from '../../components/headers_data';

const Home = (props) => {
  const [data, setData] = useState({
    projects: [],
    testimonials: [],
    team: [],
  });
  const [error, setError] = useState({
    projects: false,
    testimonials: false,
    team: false,
  });
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  props.changeHeaders(HEADERS_DATA.home);

  useEffect(() => {
    const getData = async () => {
      const routes = ['projects', 'testimonials', 'team'];

      for (let x = 0; x < routes.length; x++) {
        const res = await fetch(`/${routes[x]}`);
        const body = await res.json();
        if (res.status !== 200) {
          setError((prevState) => ({
            ...prevState,
            [routes[x]]: true,
          }));
        } else {
          setData((prevState) => ({
            ...prevState,
            [routes[x]]: body,
          }));
        }
      }
      setLoading(false);
    };

    getData();
  }, [refresh]);

  return (
    <MainContainer>
      {loading ? (
        <Loading />
      ) : (
        <Content
          projects={data.projects}
          testimonials={data.testimonials}
          team={data.team}
        />
      )}
      <Divider orientation='horizontal' flexItem border-color='primary.grey' />

      <Footer />
    </MainContainer>
  );
};

export default Home;

const MainContainer = styled.div`
  min-height: 90vh;
  margintop: 1rem;
  overflow-x: hidden;
`;
