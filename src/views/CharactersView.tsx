import { Box, Grid, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import CustomCard from '../components/CustomCard';
import CustomInput from '../components/CustomInput';
import CustomPagination from '../components/Pagination';
import CharactersService, {
  Character,
  CharactersByPage,
} from '../services/characters';
import { useAppSelector } from '../store';
import getItemsUsingAppPagination from '../utils/getItemsUsingAppPagination';

interface CharactersDisplayed extends CharactersByPage {
  userSearching: boolean;
  selected: CharactersByPage['characters'];
}

const CharactersView = () => {
  const { favorites } = useAppSelector((state) => state.characters);

  const [loading, setLoading] = useState(false);

  // Lógica de personajes mostrados
  const [charactersDisplayed, setCharactersDisplayed] =
    useState<CharactersDisplayed>({
      characters: [],
      selected: [],
      totalAmountOfCharacters: 0,
      totalAmountOfPages: 0,
      userSearching: false,
    });

  // Lógica de paginación
  const [page, setPage] = useState(1);
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSearchCharacter = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      setCharactersDisplayed((prevState) => ({
        ...prevState,
        userSearching: true,
      }));

      try {
        if (event.target.value !== '') {
          const matchingCharacters =
            await CharactersService.GetCharactersByName(event.target.value);
          setCharactersDisplayed((prevState) => ({
            ...prevState,
            ...matchingCharacters,
            selected: getItemsUsingAppPagination<Character>(
              page,
              matchingCharacters.characters
            ),
          }));
        } else {
          setCharactersDisplayed((prevState) => ({
            ...prevState,
            userSearching: false,
          }));
          console.log('??');
          setPage(1);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  };

  const getCharacterUsingAPIPagination = async () => {
    const charactersToDisplay = await CharactersService.getCharactersByPage(
      page
    );
    setCharactersDisplayed((prevState) => ({
      ...prevState,
      ...charactersToDisplay,
      selected: charactersToDisplay.characters,
    }));
    console.log(
      'personajes buscados por la paginacion API: ',
      charactersToDisplay
    );
  };

  useEffect(
    () => {
      // El usuario no tiene nada escrito en el input, por ende busco la data usando la paginación de la API
      if (!charactersDisplayed.userSearching) {
        setLoading(true);
        getCharacterUsingAPIPagination().catch((error: Error) =>
          console.error(error?.message)
        );
        setLoading(false);

        // El usuario si tiene algo escrito en el input, por ende busco la data por la paginación de la aplicación
      } else if (charactersDisplayed.userSearching) {
        setCharactersDisplayed((prevState) => ({
          ...prevState,
          selected: getItemsUsingAppPagination<Character>(
            page,
            prevState.characters
          ),
        }));
        console.log(
          'Seleccionados por la paginación APP: ',
          charactersDisplayed.selected
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, charactersDisplayed.userSearching]
  );

  return (
    <>
      <Typography
        variant="h2"
        width="100%"
        textAlign="center"
      >
        {' '}
        Characters View
      </Typography>
      <CustomInput handleChange={handleSearchCharacter} />
      {loading ? <h2>LOADING!</h2> : null}
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          rowSpacing={4}
          marginTop={4}
        >
          {charactersDisplayed.selected.length > 0
            ? charactersDisplayed.selected.map((character) => (
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
                  <CustomCard
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
          count={charactersDisplayed.totalAmountOfPages}
          handleChange={handleChangePage}
          page={page}
        />
      </Box>
    </>
  );
};

export default CharactersView;
