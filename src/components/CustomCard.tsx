import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useAppDispatch } from '../store';
import { setFavoriteCharacter } from '../store/slices/characterSlice';
import { OutlinedFavoriteIcon, SolidFavoriteIcon } from './icons';
// import { CSSProperties } from 'react';

export interface EmployeeCardProps {
  name: string;
  imageSource: string;
  id: string;
  favorite: boolean;
}

const CustomCard = ({ name, imageSource, id, favorite }: EmployeeCardProps) => {
  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setFavoriteCharacter(id));
  };
  return (
    <Card
      sx={{
        overflow: 'hidden',
        padding: '0px',
        boxShadow: 1,
        ':hover': {
          boxShadow: 2,
        },
        maxWidth: '300px',
        width: { xs: '200px', sm: '180px', md: '185px', lg: '190px' },
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
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
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px',
                  aspectRatio: '1/1',
                  borderRadius: '50%',
                  // backgroundColor: palette.secondary.main,
                  backgroundColor: 'rgba(242, 240, 240, 0.85)',
                  backdropFilter: 'blur(6px)',
                  boxShadow: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  width="max-content"
                  fontSize={id.length === 3 ? '0.7rem' : '0.9rem'}
                  fontWeight={700}
                  sx={{
                    textAlign: 'center',
                    minWidth: '33px',
                  }}
                >
                  {`#${id}`}
                </Typography>
              </Box>
            </Button>
          </Box>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            padding={3}
            height="100%"
            width="100%"
            spacing={2}
          >
            <IconButton
              aria-label="add to favorites"
              onClick={handleClick}
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
            <Typography
              variant="subtitle2"
              width="auto"
              textAlign="center"
              fontSize={{
                lg: '0.8rem',
              }}
            >
              {name}
            </Typography>
          </Stack>
        </>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
