import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { setFavoriteCharacter } from '../store/slices/characterSlice';
import FavoriteButton from './FavoriteButton';

export interface CharacterCardProps {
  name: string;
  imageSource: string;
  id: string;
  favorite: boolean;
}

const CharacterCard = ({
  name,
  imageSource,
  id,
  favorite,
}: CharacterCardProps) => {
  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const handleClickFavorite = () => {
    dispatch(setFavoriteCharacter(id));
  };
  const navigate = useNavigate();

  const handleClickMoreDetails = () => {
    navigate(`/characters/details/${id}`);
  };
  return (
    <Card
      sx={{
        overflow: 'hidden',
        padding: '0px',
        maxWidth: '250px',
        width: { xs: '270px', sm: '180px', md: '185px', lg: '190px' },
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: { sx: 'row', sm: 'column' },
          justifyContent: 'center',
          alignItems: 'center',
          heigth: 'auto',
          padding: '0px',
          '&:last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <>
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Button
              onClick={handleClickMoreDetails}
              sx={{
                padding: 0,
                color: palette.text.primary,
              }}
            >
              <img
                src={imageSource}
                alt={name}
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1/1',
                  borderEndEndRadius: '50%',
                  borderEndStartRadius: '50%',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: {
                    xs: '5px',
                    sm: '-20px',
                  },
                  left: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px',
                  aspectRatio: '1/1',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(242, 240, 240, 0.85)',
                  backdropFilter: 'blur(6px)',
                  boxShadow: 1,
                }}
              >
                <RouterLink to={`/characters/details/${id}`}>
                  <Typography
                    variant="subtitle2"
                    width="max-content"
                    fontSize={{
                      sx: id.length === 3 ? '0.3rem' : '0.4rem',
                      sm: id.length === 3 ? '0.7rem' : '0.9rem',
                    }}
                    fontWeight={700}
                    sx={{
                      textAlign: 'center',
                      minWidth: '33px',
                    }}
                  >
                    {`#${id}`}
                  </Typography>
                </RouterLink>
              </Box>
            </Button>
          </Box>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            padding={{
              sx: 2,
              sm: 3,
            }}
            height="100%"
            width="100%"
            spacing={2}
          >
            <FavoriteButton
              favorite={favorite}
              handleClick={handleClickFavorite}
            />
            <RouterLink to={`/characters/details/${id}`}>
              <Typography
                variant="subtitle2"
                width="auto"
                textAlign="center"
                fontSize={{
                  xs: '0.65rem',
                  sm: '0.8rem',
                }}
              >
                {name}
              </Typography>
            </RouterLink>
          </Stack>
        </>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
