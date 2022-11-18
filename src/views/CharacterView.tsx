import { Box, Grid, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import CustomInput from '../components/CustomInput';
import NoResults from '../components/NoResults';
import CustomPagination from '../components/Pagination';
import ProgressBar from '../components/ProgressBar';
import CharacterService from '../services/characters';
import { Character, CharactersPerPage } from '../services/characters/types';
import { useAppSelector } from '../store';
import { Fetch } from '../types/fetch';
import getItemsUsingAppPagination from '../utils/getItemsUsingAppPagination';
import handleChangePage from '../utils/handleChangePage';

interface DisplayCharacters extends CharactersPerPage {
  userSearching: boolean;
  selected: CharactersPerPage['characters'];
  fetch: Fetch;
}

const CharacterView = () => {
  const {
    favorites: { characters: favoriteCharacter },
  } = useAppSelector((state) => state.favorite);

  const [loading, setLoading] = useState(false);

  // Lógica de personajes mostrados
  const [displayCharacters, setDisplayCharacters] = useState<DisplayCharacters>(
    {
      characters: [],
      selected: [],
      totalAmountOfPages: 0,
      userSearching: false,
      fetch: 'init',
    }
  );

  // Lógica de paginación
  const [page, setPage] = useState(1);
  const handlePagination = handleChangePage(setPage);

  const handleSearchCharacter = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      setDisplayCharacters((prevState) => ({
        ...prevState,
        userSearching: true,
      }));

      try {
        if (event.target.value !== '') {
          const matchingCharacters = await CharacterService.GetCharactersByName(
            event.target.value
          );
          setDisplayCharacters((prevState) => ({
            ...prevState,
            ...matchingCharacters,
            fetch: 'data',
            selected: getItemsUsingAppPagination<Character>(
              page,
              matchingCharacters.characters
            ),
          }));
        } else {
          setDisplayCharacters((prevState) => ({
            ...prevState,
            userSearching: false,
            fetch: 'data',
          }));
          setPage(1);
        }
      } catch (error) {
        setDisplayCharacters((prevState) => ({
          ...prevState,
          fetch: 'noData',
        }));
        console.error(error);
      }
      setLoading(false);
    })();
  };

  const getCharactersUsingApiPagination = async () => {
    try {
      const charactersToDisplay = await CharacterService.getCharactersByPage(
        page
      );
      setDisplayCharacters((prevState) => ({
        ...prevState,
        ...charactersToDisplay,
        selected: charactersToDisplay.characters,
        fetch: 'data',
      }));
    } catch (error) {
      setDisplayCharacters((prevState) => ({
        ...prevState,
        fetch: 'noData',
      }));
    }
  };

  useEffect(() => {
    // El usuario no tiene nada escrito en el input, por ende busco la data usando la paginación de la API
    if (!displayCharacters.userSearching) {
      setLoading(true);
      getCharactersUsingApiPagination().catch((error: Error) => {
        setDisplayCharacters((prevState) => ({
          ...prevState,
          fetch: 'noData',
        }));
        console.error(error?.message);
      });
      setLoading(false);
      // El usuario si tiene algo escrito en el input, por ende busco la data por la paginación de la aplicación
    } else {
      setDisplayCharacters((prevState) => ({
        ...prevState,
        selected: getItemsUsingAppPagination<Character>(
          page,
          prevState.characters
        ),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, displayCharacters.userSearching]);

  return (
    <>
      <Typography
        variant="h3"
        width="100%"
        textAlign="center"
      >
        Character Section
      </Typography>
      <CustomInput handleChange={handleSearchCharacter} />
      <ProgressBar loading={loading} />
      {displayCharacters.fetch === 'noData' && !loading && <NoResults />}
      <Box
        sx={{ width: '100%' }}
        marginTop={5}
      >
        <Grid
          container
          rowSpacing={4}
        >
          {displayCharacters.selected.length > 0 &&
          displayCharacters.fetch === 'data'
            ? displayCharacters.selected.map((character) => (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  lg={2}
                  key={character?.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <CharacterCard
                    name={character?.name || 'broken'}
                    id={character?.id || 'broken'}
                    imageSource={character?.image || 'broken'}
                    favorite={favoriteCharacter.includes(character?.id || '-1')}
                  />
                </Grid>
              ))
            : null}
        </Grid>
        {displayCharacters.selected.length > 0 &&
        displayCharacters.fetch === 'data' ? (
          <CustomPagination
            count={displayCharacters.totalAmountOfPages}
            handleChange={handlePagination}
            page={page}
          />
        ) : null}
      </Box>
    </>
  );
};

export default CharacterView;
