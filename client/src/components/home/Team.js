import styled from 'styled-components';
import { Box, Divider, Typography } from '@mui/material';
import theme from '../../themes/theme';

const Team = (props) => {
  return (
    <div>
      <Box sx={{ marginTop: '2rem' }}>
        <div>
          <Typography sx={{ fontWeight: 600, fontSize: '2.4rem' }}>
            Meet the Team
          </Typography>
          <Divider
            orientation='horizontal'
            border-color={theme.palette.primary.grey}
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <Grid>
          {props.team
            ? props.team.map((d, i) => (
                <Holder key={`${d.name}-${i}`}>
                  <Thumbnail>
                    <img src={d.img} alt='...' className='team-img' />
                    <Caption>
                      <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
                        {d.name}
                      </Typography>
                      <Typography>{d.role}</Typography>
                    </Caption>
                  </Thumbnail>
                </Holder>
              ))
            : 'loading'}
        </Grid>
      </Box>
    </div>
  );
};

export default Team;

const Holder = styled.div`
  margin-bottom: 1rem;
`;

const Caption = styled.div``;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 600px) {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1000px) {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Thumbnail = styled.div`
  background: transparent;
  border: 0;
  img {
    width: 240px;
  }
`;
