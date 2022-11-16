import { Card, CardContent, Stack, Typography } from '@mui/material';
import episodeTextFormatter from '../utils/episodeTextFormatter';

interface EpisodeCardProps {
  episode: string | null;
  name: string | null;
  id: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EpisodeCard = ({ episode, name, id }: EpisodeCardProps) => {
  if (!name || !id) return null;
  return (
    <Card
      sx={{
        width: { xs: '90%', sm: '400px', lg: '450px' },
        aspectRatio: '4/1.1',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginY: 'auto',
        }}
      >
        <Stack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Typography
            textAlign="center"
            fontWeight={{
              xs: 500,
              sm: 400,
              lg: 400,
            }}
            fontSize={{
              xs: '0.6rem',
              sm: '1rem',
              lg: '1rem',
            }}
          >{`${episodeTextFormatter(episode)}:`}</Typography>
          <Typography
            textAlign="center"
            fontWeight={{ xs: 600, sm: 500, lg: 500 }}
            fontSize={{
              xs: '0.7rem',
              sm: '1rem',
              lg: '1.1rem',
            }}
          >
            {name}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EpisodeCard;
