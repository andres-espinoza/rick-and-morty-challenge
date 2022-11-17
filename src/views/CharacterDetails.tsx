import {
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import { ExpandIcon } from '../components/icons';
import Loader from '../components/Loader';
import CharacterService from '../services/characters';
import { FullCharacter } from '../services/characters/types';
import { useAppDispatch, useAppSelector } from '../store';
import { setFavoriteCharacter } from '../store/slices/characterSlice';
import { BorderRadius } from '../theme';
import episodeTextFormatter from '../utils/episodeTextFormatter';

const CharacterDetails = () => {
  const { characterId } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleClickFavorite = () => {
    if (characterId) dispatch(setFavoriteCharacter(characterId));
  };
  const {
    favorites: { characters: favCharacters },
  } = useAppSelector((state) => state.favorite);
  const [fullCharacter, setFullCharacter] = useState<FullCharacter>({
    name: null,
    image: null,
    episode: [],
    gender: null,
    location: null,
    origin: null,
    species: null,
    status: null,
    type: null,
  });

  const { palette } = useTheme();

  useEffect(() => {
    if (!characterId) return;
    setLoading(true);
    CharacterService.GetAllDataSingleCharacterById(characterId)
      .then((character) => {
        setFullCharacter({
          ...character,
        });
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <Loader />;
  return (
    <Card
      sx={{
        width: {
          xs: '260px',
          sm: '400px',
          md: '700px',
          lg: '800px',
        },
        padding: {
          xs: '0.5rem',
          lg: '1rem',
        },
        marginX: 'auto',
        position: 'relative',
      }}
    >
      {/* <IconButton
        aria-label="go back"
        onClick={() => navigate(-1)}
        sx={{
          position: 'absolute',
          top: '7px',
          left: '7px',
        }}
      >
        <GoBackIcon
          color="primary"
          fontSize="large"
        />
      </IconButton> */}
      <CardContent>
        <FavoriteButton
          handleClick={handleClickFavorite}
          favorite={favCharacters.includes(characterId || '-1')}
          typeComponent="CharacterDetails"
        />
        <Stack
          flexDirection={{
            lg: 'column',
          }}
        >
          <Stack // * IMAGE VS TEXT STACK
            flexDirection={{
              xs: 'column',
              md: 'row',
              lg: 'row',
            }}
            justifyContent={{
              sx: 'center',
              lg: 'space-around',
            }}
            alignItems={{
              xs: 'center',
              lg: 'center',
            }}
            gap={{
              xs: 3,
            }}
          >
            <Box
              sx={{
                aspectRatio: '1/1',
                height: {
                  xs: '200px',
                  md: '300px',
                  lg: '350px',
                },
                width: {
                  xs: '200px',
                  md: '300px',
                  lg: '350px',
                },
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {fullCharacter.image && fullCharacter.image !== '' ? (
                <img
                  src={fullCharacter.image}
                  alt={fullCharacter.name || 'Rick And Morty Character!'}
                  style={{
                    aspectRatio: '1/1',
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  sx={{
                    aspectRatio: '1/1',
                    width: '100%',
                    height: '100%',
                  }}
                />
              )}
            </Box>
            <Stack
              flexDirection={{
                lg: 'column',
              }}
              justifyContent={{
                lg: 'flex-start',
              }}
              gap={2}
            >
              <Stack // * ---  NAME ---
                flexDirection={{
                  lg: 'column',
                }}
                justifyContent={{
                  lg: 'center',
                }}
                gap={1}
              >
                <Typography
                  fontWeight={{
                    lg: 400,
                  }}
                >
                  &loz; Character&apos;s Full Name:
                </Typography>
                <Typography
                  fontWeight={{
                    xs: 500,
                    lg: 500,
                  }}
                  // color={palette.secondary.contrastText}
                >
                  {fullCharacter.name ? fullCharacter.name : 'Unknown'}
                </Typography>
              </Stack>
              <Stack // * ---  SPECIE ---
                flexDirection={{
                  lg: 'column',
                }}
                justifyContent={{
                  lg: 'center',
                }}
                gap={1}
              >
                <Typography
                  fontWeight={{
                    lg: 400,
                  }}
                >
                  &loz; Specie:
                </Typography>
                <Typography
                  fontWeight={{
                    xs: 500,
                    lg: 500,
                  }}
                  // color={palette.secondary.contrastText}
                >
                  {fullCharacter.species ? fullCharacter.species : 'Unknown'}
                </Typography>
              </Stack>
              <Stack // * ---  GENDER ---
                flexDirection={{
                  lg: 'column',
                }}
                justifyContent={{
                  lg: 'center',
                }}
                gap={1}
              >
                <Typography
                  fontWeight={{
                    lg: 400,
                  }}
                >
                  &loz; Gender:
                </Typography>
                <Typography
                  fontWeight={{
                    xs: 500,
                    lg: 500,
                  }}
                >
                  {fullCharacter.gender ? fullCharacter.gender : 'Unknown'}
                </Typography>
              </Stack>
              <Stack // * ---  TYPE ---
                flexDirection={{
                  lg: 'column',
                }}
                justifyContent={{
                  lg: 'center',
                }}
                gap={1}
              >
                <Typography
                  fontWeight={{
                    lg: 400,
                  }}
                >
                  &loz; Type:
                </Typography>
                <Typography
                  fontWeight={{
                    xs: 500,
                    lg: 500,
                  }}
                >
                  {fullCharacter.type ? fullCharacter.type : 'Unknown'}
                </Typography>
              </Stack>
              <Stack // * ---  ORIGIN ---
                flexDirection={{
                  lg: 'column',
                }}
                justifyContent={{
                  lg: 'center',
                }}
                gap={1}
              >
                <Typography
                  fontWeight={{
                    lg: 400,
                  }}
                >
                  &loz; Origin:
                </Typography>
                <Typography
                  fontWeight={{
                    xs: 500,
                    lg: 500,
                  }}
                >
                  {fullCharacter.origin?.name
                    ? fullCharacter.origin.name
                    : 'Unknown'}
                </Typography>
              </Stack>
              <Stack // * ---  LOCATION ---
                flexDirection={{
                  lg: 'column',
                }}
                justifyContent={{
                  lg: 'center',
                }}
                gap={1}
              >
                <Typography
                  fontWeight={{
                    lg: 400,
                  }}
                >
                  &loz; Current location:
                </Typography>
                <Typography
                  fontWeight={{
                    xs: 500,
                    lg: 500,
                  }}
                >
                  {fullCharacter.location?.name
                    ? fullCharacter.location.name
                    : 'Unknown'}
                </Typography>
              </Stack>
              <Stack // * ---  STATUS ---
                flexDirection={{
                  lg: 'column',
                }}
                justifyContent={{
                  lg: 'center',
                }}
                gap={1}
              >
                <Typography
                  fontWeight={{
                    lg: 400,
                  }}
                >
                  &loz; Status:
                </Typography>
                <Typography
                  fontWeight={{
                    xs: 500,
                    lg: 500,
                  }}
                >
                  {fullCharacter.status ? fullCharacter.status : 'Unknown'}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {fullCharacter.episode.length > 0 && fullCharacter.episode[0] && (
            <Accordion
              sx={{
                marginTop: 3,
                boxShadow: 0,
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandIcon
                    fontSize="large"
                    sx={{ color: palette.primary.main }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  backgroundColor: palette.background.paper,
                  borderRadius: BorderRadius.Card,
                  border: 'solid 2px',
                  borderColor: palette.primary.main,
                }}
              >
                <Typography
                  color={palette.text.primary}
                  fontWeight={500}
                >
                  {`This character appears in ${
                    fullCharacter.episode.length > 1
                      ? `${fullCharacter.episode.length} episodes`
                      : 'this episode'
                  }:`}
                </Typography>
              </AccordionSummary>
              {fullCharacter.episode.map((episode) => {
                if (episode?.name && episode.episode && episode?.id)
                  return (
                    <AccordionDetails key={episode.id}>
                      <Stack
                        flexDirection={{
                          lg: 'row',
                        }}
                        justifyContent={{
                          lg: 'flex-start',
                        }}
                        gap={0.6}
                      >
                        <Typography>
                          &loz; {episodeTextFormatter(episode.episode)}:
                        </Typography>
                        <RouterLink to={`/episodes/details/${episode.id}`}>
                          <Typography
                            fontWeight={{
                              xs: 500,
                              lg: 500,
                            }}
                          >
                            {episode.name}
                          </Typography>
                        </RouterLink>
                      </Stack>
                    </AccordionDetails>
                  );
                return null;
              })}
            </Accordion>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CharacterDetails;
