import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Episode, EpisodesPerPage } from '../services/episodes/types';
import handleChangePage from '../utils/handleChangePage';
import EpisodesService from '../services/episodes';
import getItemsUsingAppPagination from '../utils/getItemsUsingAppPagination';
import EpisodeCard from '../components/EpisodeCard';
import CustomPagination from '../components/Pagination';
import CustomInput from '../components/CustomInput';
import { useAppSelector } from '../store';
import ProgressBar from '../components/ProgressBar';
import NoResults from '../components/NoResults';
import { Fetch } from '../types/fetch';

interface DisplayEpisodes extends EpisodesPerPage {
  userSearching: boolean;
  selected: EpisodesPerPage['episodes'];
  fetch: Fetch;
}

const EpisodeView = () => {
  const {
    favorites: { episodes: favoriteEpisodes },
  } = useAppSelector((state) => state.favorite);

  const [loading, setLoading] = useState(false);

  // Lógica de episodios mostrados
  const [displayEpisodes, setDisplayEpisodes] = useState<DisplayEpisodes>({
    episodes: [],
    selected: [],
    totalAmountOfPages: 0,
    userSearching: false,
    fetch: 'init',
  });

  const [page, setPage] = useState(1);
  const handlePagination = handleChangePage(setPage);

  const handleSearchCharacter = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      setDisplayEpisodes((prevState) => ({
        ...prevState,
        userSearching: true,
      }));

      try {
        if (event.target.value !== '') {
          const matchingEpisodes = await EpisodesService.GetEpisodesByName(
            event.target.value
          );
          setDisplayEpisodes((prevState) => ({
            ...prevState,
            ...matchingEpisodes,
            selected: getItemsUsingAppPagination<Episode>(
              page,
              matchingEpisodes.episodes
            ),
            fetch: 'data',
          }));
        } else {
          setDisplayEpisodes((prevState) => ({
            ...prevState,
            userSearching: false,
            fetch: 'data',
          }));
          setPage(1);
        }
      } catch (error) {
        setDisplayEpisodes((prevState) => ({
          ...prevState,
          fetch: 'noData',
        }));
        console.error(error);
      }
      setLoading(false);
    })();
  };

  const getEpisodesUsingApiPagination = async () => {
    const episodesToDisplay = await EpisodesService.getEpisodesByPage(page);
    setDisplayEpisodes((prevState) => ({
      ...prevState,
      ...episodesToDisplay,
      selected: episodesToDisplay.episodes,
      fetch: 'data',
    }));
  };

  useEffect(() => {
    // El usuario no tiene nada escrito en el input, por ende busco la data usando la paginación de la API
    if (!displayEpisodes.userSearching) {
      setLoading(true);
      getEpisodesUsingApiPagination().catch((error: Error) => {
        setDisplayEpisodes((prevState) => ({
          ...prevState,
          fetch: 'noData',
        }));
        console.error(error?.message);
      });
      setLoading(false);

      // El usuario si tiene algo escrito en el input, por ende busco la data por la paginación de la aplicación
    } else {
      setDisplayEpisodes((prevState) => ({
        ...prevState,
        selected: getItemsUsingAppPagination<Episode>(page, prevState.episodes),
        fetch: 'data',
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, displayEpisodes.userSearching]);

  return (
    <>
      <Typography
        variant="h3"
        width="100%"
        textAlign="center"
      >
        Episode Section
      </Typography>
      <CustomInput handleChange={handleSearchCharacter} />
      <ProgressBar loading={loading} />
      {displayEpisodes.fetch === 'noData' && !loading && <NoResults />}
      <Box sx={{ width: '100%', marginTop: 5 }}>
        <Stack
          gap={3}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          flexWrap="wrap"
        >
          {displayEpisodes.selected.length > 0 &&
          displayEpisodes.fetch === 'data'
            ? displayEpisodes.selected.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  id={episode.id}
                  name={episode?.name}
                  episode={episode?.episode}
                  favorite={favoriteEpisodes.includes(episode?.id || '-1')}
                />
              ))
            : null}
        </Stack>
        {displayEpisodes.selected.length > 0 &&
        displayEpisodes.fetch === 'data' ? (
          <CustomPagination
            count={displayEpisodes.totalAmountOfPages}
            handleChange={handlePagination}
            page={page}
          />
        ) : null}
      </Box>
    </>
  );
};

export default EpisodeView;
