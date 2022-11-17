import { Typography, Box } from '@mui/material';
import RickAndMortyLogo from '../components/icons/RickAndMortyLogo';

const Home = () => {
  return (
    <Box
      width="100%"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <div>
        <Typography
          variant="h2"
          width="100%"
          textAlign="center"
        >
          Welcome to the
        </Typography>
        <Typography
          variant="h1"
          width="100%"
          textAlign="center"
        >
          Rick & Morty App!
        </Typography>
      </div>
      <RickAndMortyLogo
        height={100}
        className="pulse"
      />
    </Box>
  );
};

export default Home;
