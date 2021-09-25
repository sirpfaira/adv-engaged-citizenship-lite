import styled from 'styled-components';
import { Box, Divider, Typography } from '@mui/material';
import theme from '../../themes/theme';

const Testimonials = (props) => {
  return (
    <Container>
      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: '2.4rem' }}>
          Testimonials
        </Typography>
        <Divider
          orientation='horizontal'
          border-color={theme.palette.primary.grey}
        />

        <Grid>
          {props.testimonials
            ? props.testimonials.map((testimonial, i) => (
                <Holder key={`${testimonial.name}-${i}`}>
                  <Item>
                    <ImageHolder>
                      <img src={`${testimonial.img}`} alt='' />
                    </ImageHolder>
                    <Content>
                      <p>"{testimonial.message}"</p>
                      <Meta> - {testimonial.name} </Meta>
                    </Content>
                  </Item>
                </Holder>
              ))
            : 'Loading data...'}
        </Grid>
      </Box>
    </Container>
  );
};

export default Testimonials;

const Container = styled.div`
  margin-top: 2.9rem;
`;

const ImageHolder = styled.div`
  float: left;
  margin-right: 15px;
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  img {
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-top: 1.2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 5px;
  @media (min-width: 570px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Meta = styled.div`
  margin-top: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #666;
`;

const Content = styled.div`
  overflow: hidden;
  p {
    margin-bottom: 0;
    font-size: 14px;
    font-style: italic;
  }
`;

const Item = styled.div`
  padding: 20px;
`;

const Holder = styled.div``;
