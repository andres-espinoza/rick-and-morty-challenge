import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AutocompleteMultiSelector from '../components/autocomplete/AutocompleteMultiSelector';
import CustomCard from '../components/CustomCard';
import CustomPagination from '../components/Pagination';
// import useQueryParams from '../hooks/useQueryParams';
import { useAppSelector } from '../store';
import { CharacterShape, CharacterSliceShape } from '../store/slices/types';

const CharactersView = () => {
  const { charactersBasicData, favorites } = useAppSelector(
    (state) => state.characters
  );

  const [charactersInPage, setCharactersInPage] = useState<
    CharacterSliceShape['charactersBasicData']
  >([]);

  const [page, setPage] = useState(1);

  const [count, setCount] = useState(
    Math.floor(charactersBasicData.length / 24)
  );

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // La data que se muestra en la pagina seleccionada
  const paginateData = (
    pag: number,
    data: CharacterSliceShape['charactersBasicData'],
    amountPerPage = 24
  ) => {
    if (!data || data.length < 1) return [];
    const from = amountPerPage * pag - amountPerPage;
    const to = amountPerPage * pag;
    return data.slice(from, to);
  };

  useEffect(() => {
    if (charactersBasicData) {
      setCharactersInPage(paginateData(page, charactersBasicData));
      setCount(Math.floor(charactersBasicData.length / 24));
    } else {
      setCharactersInPage(paginateData(page, []));
      setCount(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
      <AutocompleteMultiSelector
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
      />
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          rowSpacing={4}
          marginTop={4}
        >
          {charactersInPage && charactersInPage.length > 0
            ? charactersInPage.map((character) => (
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
          count={count}
          handleChange={handleChangePage}
          page={page}
        />
      </Box>
    </>
  );
};

export default CharactersView;
