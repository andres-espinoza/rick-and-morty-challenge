import { Box, LinearProgress } from '@mui/material';

const ProgressBar = ({ loading }: { loading: boolean }) => {
  return (
    <Box
      sx={{
        minWidth: '260px',
        maxWidth: '300px',
        marginX: 'auto',
        marginTop: 3,
      }}
    >
      {loading ? (
        <LinearProgress />
      ) : (
        <div
          style={{
            minWidth: '260px',
            maxWidth: '300px',
            marginInline: 'auto',
            height: '4px',
          }}
        />
      )}
    </Box>
  );
};

export default ProgressBar;
