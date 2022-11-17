import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '../store';
import { setFavoriteEpisode } from '../store/slices/characterSlice';
import episodeTextFormatter from '../utils/episodeTextFormatter';
import { OutlinedFavoriteIcon, SolidFavoriteIcon } from './icons';

interface EpisodeCardProps {
  episode: string | null;
  name: string | null;
  id: string | null;
  favorite: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EpisodeCard = ({ episode, name, id, favorite }: EpisodeCardProps) => {
  const dispatch = useAppDispatch();
  if (!name || !id) return null;
  const handleClick = () => {
    dispatch(setFavoriteEpisode(id));
  };
  return (
    <Card
      sx={{
        width: { xs: '90%', sm: '400px', lg: '450px' },
        aspectRatio: {
          xs: '4/1.4',
          sm: '4/1.1',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginY: 'auto',
          position: 'relative',
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
              xs: '0.8rem',
              sm: '1rem',
              lg: '1rem',
            }}
          >{`${episodeTextFormatter(episode)}:`}</Typography>
          <Typography
            textAlign="center"
            fontWeight={{ xs: 600, sm: 500, lg: 500 }}
            fontSize={{
              xs: '0.9rem',
              sm: '1rem',
              lg: '1.1rem',
            }}
          >
            {name}
          </Typography>
        </Stack>
        <IconButton
          aria-label="add to favorites"
          onClick={handleClick}
          sx={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
          }}
        >
          {favorite ? (
            <SolidFavoriteIcon
              color="primary"
              sx={{
                fontSize: 30,
              }}
            />
          ) : (
            <OutlinedFavoriteIcon
              color="primary"
              sx={{
                fontSize: 30,
              }}
            />
          )}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default EpisodeCard;
