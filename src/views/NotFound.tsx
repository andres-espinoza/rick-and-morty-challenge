import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import notFoundImage from '../assets/notFound.webp';

const NotFound: FC = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 20, md: 30 },
        }}
      >
        <Typography
          align="center"
          color="textPrimary"
          variant={mobileDevice ? 'h4' : 'h1'}
          sx={{
            zIndex: 10,
          }}
        >
          404: The page you are looking for is not in this dimension!
        </Typography>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Typography
            align="center"
            color="textSecondary"
            variant="subtitle2"
            sx={{
              zIndex: 10,
            }}
          >
            If you want to come back, just press the button below
          </Typography>
          <Button
            color="primary"
            component={RouterLink}
            to="/"
            variant="outlined"
            sx={{
              zIndex: 10,
            }}
          >
            Home
          </Button>
        </Stack>
      </Container>
      <img
        src={notFoundImage}
        alt=""
        style={{
          width: 'calc(10% + 200px)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -45%)',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default NotFound;
