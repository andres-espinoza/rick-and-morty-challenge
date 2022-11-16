/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Typography } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import AutocompleteMultiSelector from '../components/autocomplete/AutocompleteMultiSelector';
import CustomCard from '../components/CustomCard';
import CustomInput from '../components/CustomInput';
import CustomPagination from '../components/Pagination';
import CharactersService, { CharactersByPage } from '../services/characters';
// import useQueryParams from '../hooks/useQueryParams';
import { useAppSelector } from '../store';
import { CharacterShape, CharacterSliceShape } from '../store/slices/types';

interface CharactersDisplayed extends CharactersByPage {
  userSearching: boolean;
}

const CharactersView = () => {
  const { favorites } = useAppSelector((state) => state.characters);

  const [loading, setLoading] = useState(false);

  // Lógica de personajes mostrados
  const [charactersDisplayed, setCharactersDisplayed] =
    useState<CharactersDisplayed>({
      characters: [],
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

  //! En progreso
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
          }));
        } else {
          setCharactersDisplayed((prevState) => ({
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
  // const paginateData = (
  //   pag: number,
  //   data: CharactersByPage['characters'],
  //   dataPerPage = 20
  // ) => {
  //   if (!data || data.length < 1) return [];
  //   const from = dataPerPage * pag - dataPerPage;
  //   const to = dataPerPage * pag;
  //   return data.slice(from, to);
  // };

  // const initCharacters = useCallback(async () => {
  //   const charactersToDisplay = await CharactersService.getCharactersByPage(
  //     page
  //   );
  // }, [page]);

  const getCharacterUsingPagination = async () => {
    const charactersToDisplay = await CharactersService.getCharactersByPage(
      page
    );
    setCharactersDisplayed((prevState) => ({
      ...prevState,
      ...charactersToDisplay,
    }));
  };

  useEffect(
    () => {
      if (!charactersDisplayed.userSearching) {
        setLoading(true);
        getCharacterUsingPagination().catch((error: Error) =>
          console.error(error?.message)
        );
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
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
      {/* <AutocompleteMultiSelector
        dataSource={charactersBasicData || []}
        selectedData={[]}
        renderFunc={(character: CharacterShape) => {
          if (character?.id && character?.name)
            return `#${character.id} - ${character.name}`;
          if (character?.id) return `Character number #${character.id}`;
          if (character?.name) return character?.name;
          return 'No data avaible';
        }}
        addAll
        label="Characters"
        onChange={(_e, data: CharacterShape[]) => {
          if (
            (charactersBasicData && data.length === 0) ||
            (charactersBasicData && data.length === charactersBasicData.length)
          ) {
            setCharactersInPage(paginateData(page, charactersBasicData));
            setCount(Math.floor(charactersBasicData.length / 24));
          } else {
            setCharactersInPage(paginateData(1, data));
            setCount(Math.floor(data.length / 24));
          }
        }}
      /> */}
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          rowSpacing={4}
          marginTop={4}
        >
          {charactersDisplayed.characters.length > 0
            ? charactersDisplayed.characters.map((character) => (
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
