import { Container, Stack, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NoResultsProps {
  goBackOption?: boolean;
}

const NoResults = ({ goBackOption }: NoResultsProps) => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginTop: 3,
      }}
    >
      <Stack
        flexDirection="column"
        gap={4}
      >
        <Typography
          variant="h4"
          textAlign="center"
        >
          Sorry! couldn&apos;t find anything ٩(⁎❛ᴗ❛⁎)۶
        </Typography>
        {goBackOption ? (
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              fontSize: 18,
              width: 'max-content',
              marginX: 'auto',
            }}
          >
            Go Back
          </Button>
        ) : null}
      </Stack>
    </Container>
  );
};

export default NoResults;
