import { Typography, Box, useMediaQuery } from '@mui/material';
import RickAndMortyLogo from '../components/icons/RickAndMortyLogo';

const Home = () => {
  const xl = useMediaQuery('(min-width:1536px)');
  const lg = useMediaQuery('(min-width:1200px)');
  const md = useMediaQuery('(min-width:900px)');
  const sm = useMediaQuery('(min-width:600px)');
  // eslint-disable-next-line no-nested-ternary
  const height = xl ? 250 : lg ? 200 : md ? 180 : sm ? 100 : 80;
  return (
    <Box
      width="100%"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        marginTop: {
          xs: 3,
        },
      }}
    >
      <div>
        <Typography
          variant="h2"
          width="100%"
          textAlign="center"
          fontSize={{
            xs: '1.2rem',
          }}
        >
          Welcome to the
        </Typography>
        <Typography
          variant="h1"
          width="100%"
          textAlign="center"
          fontSize={{
            xs: '2rem',
          }}
        >
          Rick & Morty App!
        </Typography>
      </div>
      <RickAndMortyLogo
        height={height}
        className="pulse"
      />
      <Typography
        variant="body1"
        width="80%"
        textAlign="center"
        fontWeight={700}
      >
        Discover Characters & Find Episodes
      </Typography>
    </Box>
  );
};

export default Home;
