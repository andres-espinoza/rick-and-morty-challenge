import { Box, Grid, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import CustomInput from '../components/CustomInput';
import CustomPagination from '../components/Pagination';
import CharacterService from '../services/characters';
import { Character, CharactersPerPage } from '../services/characters/types';
import { useAppSelector } from '../store';
import getItemsUsingAppPagination from '../utils/getItemsUsingAppPagination';
import handleChangePage from '../utils/handleChangePage';

interface DisplayCharacters extends CharactersPerPage {
  userSearching: boolean;
  selected: CharactersPerPage['characters'];
}

const CharacterView = () => {
  const { favorites } = useAppSelector((state) => state.character);

  const [loading, setLoading] = useState(false);

  // Lógica de personajes mostrados
  const [displayCharacters, setDisplayCharacters] = useState<DisplayCharacters>(
    {
      characters: [],
      selected: [],
      totalAmountOfPages: 0,
      userSearching: false,
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
            selected: getItemsUsingAppPagination<Character>(
              page,
              matchingCharacters.characters
            ),
          }));
        } else {
          setDisplayCharacters((prevState) => ({
            ...prevState,
            userSearching: false,
          }));
          setPage(1);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  };

  const getCharactersUsingApiPagination = async () => {
    const charactersToDisplay = await CharacterService.getCharactersByPage(
      page
    );
    setDisplayCharacters((prevState) => ({
      ...prevState,
      ...charactersToDisplay,
      selected: charactersToDisplay.characters,
    }));
  };

  useEffect(() => {
    // El usuario no tiene nada escrito en el input, por ende busco la data usando la paginación de la API
    if (!displayCharacters.userSearching) {
      setLoading(true);
      getCharactersUsingApiPagination().catch((error: Error) =>
        console.error(error?.message)
      );
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

  // TODO: Mejorar el Loader
  return (
    <>
      <Typography
        variant="h2"
        width="100%"
        textAlign="center"
      >
        Character View
      </Typography>
      <CustomInput handleChange={handleSearchCharacter} />
      {loading ? <h2>LOADING!</h2> : null}
      <Box
        sx={{ width: '100%' }}
        marginTop={5}
      >
        <Grid
          container
          rowSpacing={4}
        >
          {displayCharacters.selected.length > 0
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
                    favorite={favorites.includes(character?.id || '-1')}
                  />
                </Grid>
              ))
            : null}
        </Grid>
        <CustomPagination
          count={displayCharacters.totalAmountOfPages}
          handleChange={handlePagination}
          page={page}
        />
      </Box>
    </>
  );
};

export default CharacterView;
