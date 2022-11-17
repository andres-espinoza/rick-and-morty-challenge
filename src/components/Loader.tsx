import { CircularProgress, Typography, Stack, Container } from '@mui/material';

const Loader = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Stack
        flexDirection="column"
        gap={4}
      >
        <Typography variant="h4">Loading</Typography>
        <CircularProgress size={200} />
      </Stack>
    </Container>
  );
};

export default Loader;
