import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import { ExpandIcon } from '../components/icons';
import { FullEpisode } from '../services/episodes/types';
import { useAppDispatch, useAppSelector } from '../store';
import { setFavoriteEpisode } from '../store/slices/characterSlice';
import EpisodeService from '../services/episodes';
import { BorderRadius } from '../theme';
import episodeTextSplitter from '../utils/episodeTextSplitter';
import Loader from '../components/Loader';

export const EpisodeDetails = () => {
  const { episodeId } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleClickFavorite = () => {
    if (episodeId) dispatch(setFavoriteEpisode(episodeId));
  };
  const {
    favorites: { episodes: favCharacters },
  } = useAppSelector((state) => state.favorite);
  const [fullEpisode, setFullEpisode] = useState<FullEpisode>({
    name: null,
    air_date: null,
    characters: [],
    episode: null,
  });
  const { palette } = useTheme();

  useEffect(() => {
    if (!episodeId) return;
    setLoading(true);
    EpisodeService.GetAllDataSingleEpisodeById(episodeId)
      .then((episode) => {
        setFullEpisode({
          ...episode,
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
      <CardContent>
        <FavoriteButton
          handleClick={handleClickFavorite}
          favorite={favCharacters.includes(episodeId || '-1')}
          typeComponent="CharacterDetails"
        />
        <Stack // * MAIN STACK TEXT vs ACCORDION
          flexDirection={{
            sm: 'column',
            md: 'row',
          }}
          justifyContent={{
            md: 'space-around',
          }}
          gap={2}
        >
          <Stack // * ---  NAME & AIR DATE STACK ---
            flexDirection="column"
            justifyContent={{
              lg: 'center',
            }}
            gap={2}
          >
            <Stack // * ---  NAME ---
              flexDirection={{
                lg: 'column',
              }}
              justifyContent={{
                lg: 'space-around',
              }}
              alignItems={{
                lg: 'flex-start',
              }}
              gap={2}
            >
              <Typography
                fontWeight={{
                  lg: 400,
                }}
              >
                &loz; Episode Name:
              </Typography>
              <Typography
                fontWeight={{
                  xs: 500,
                  lg: 500,
                }}
              >
                {fullEpisode.name ? fullEpisode.name : 'Unknown'}
              </Typography>
            </Stack>
            <Stack // * ---  AIR DATE ---
              flexDirection={{
                lg: 'column',
              }}
              justifyContent={{
                lg: 'center',
              }}
              gap={2}
            >
              <Typography
                fontWeight={{
                  lg: 400,
                }}
              >
                &loz; Air Date:
              </Typography>
              <Typography
                fontWeight={{
                  xs: 500,
                  lg: 500,
                }}
              >
                {fullEpisode?.air_date ? fullEpisode.air_date : 'Unknown'}
              </Typography>
            </Stack>
          </Stack>
          <Stack // * ---  EPISODE & SEASON NUMBER ---
            flexDirection="column"
            justifyContent={{
              lg: 'center',
            }}
            gap={2}
          >
            <Stack // * ---  EPISODE NUMBER ---
              flexDirection={{
                lg: 'column',
              }}
              justifyContent={{
                lg: 'center',
              }}
              gap={2}
            >
              <Typography
                fontWeight={{
                  lg: 400,
                }}
              >
                &loz; Episode Number:
              </Typography>
              <Typography
                fontWeight={{
                  xs: 500,
                  lg: 500,
                }}
              >
                {fullEpisode?.episode
                  ? `${episodeTextSplitter(fullEpisode.episode, 'episode')}`
                  : 'Unknown'}
              </Typography>
            </Stack>
            <Stack // * ---  SEASON NUMBER ---
              flexDirection={{
                lg: 'column',
              }}
              justifyContent={{
                lg: 'center',
              }}
              gap={2}
            >
              <Typography
                fontWeight={{
                  lg: 400,
                }}
              >
                &loz; Season:
              </Typography>
              <Typography
                fontWeight={{
                  xs: 500,
                  lg: 500,
                }}
              >
                {fullEpisode?.episode
                  ? `${episodeTextSplitter(fullEpisode.episode, 'season')}`
                  : 'Unknown'}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        {fullEpisode.characters.length > 0 && fullEpisode.characters[0] && (
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
                {`${
                  fullEpisode.characters.length > 1
                    ? `${fullEpisode.characters.length} characters appear on this episode`
                    : 'this character appeats in this episode'
                }:`}
              </Typography>
            </AccordionSummary>
            {fullEpisode.characters.map((character) => {
              if (character?.name && character?.image && character?.id)
                return (
                  <AccordionDetails key={character.id}>
                    <Stack
                      flexDirection={{
                        sm: 'row',
                      }}
                      justifyContent={{
                        lg: 'flex-start',
                      }}
                      alignItems="center"
                      gap={2}
                    >
                      <Box
                        sx={{
                          aspectRatio: '1/1',
                          height: {
                            xs: '50px',
                            md: '60px',
                            lg: '80px',
                          },
                          width: {
                            xs: '50px',
                            md: '60px',
                            lg: '80px',
                          },
                          borderRadius: '50%',
                          overflow: 'hidden',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {character.image !== '' ? (
                          <RouterLink
                            to={`/characters/details/${character.id}`}
                          >
                            <img
                              src={character.image}
                              alt={
                                character.name || 'Rick And Morty Character!'
                              }
                              style={{
                                aspectRatio: '1/1',
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </RouterLink>
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
                      <RouterLink to={`/characters/details/${character.id}`}>
                        <Typography
                          fontWeight={{
                            xs: 500,
                            lg: 500,
                          }}
                          textAlign="center"
                        >
                          {character.name}
                        </Typography>
                      </RouterLink>
                    </Stack>
                  </AccordionDetails>
                );
              return null;
            })}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default EpisodeDetails;
