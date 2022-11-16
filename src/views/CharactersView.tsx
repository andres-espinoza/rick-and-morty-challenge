import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AutocompleteMultiSelector from '../components/autocomplete/AutocompleteMultiSelector';
import CustomCard from '../components/CustomCard';
import CustomPagination from '../components/Pagination';
import useQueryParams from '../hooks/useQueryParams';
import { useAppSelector } from '../store';
import { CharacterShape, CharacterSliceShape } from '../store/slices/types';

const CharactersView = () => {
  const { charactersBasicData, favorites } = useAppSelector(
    (state) => state.characters
  );

  const queryParams = useQueryParams();
  const currentPage = Number(queryParams.get('page')) || 1;

  const [charactersInPage, setCharactersInPage] = useState<
    CharacterSliceShape['charactersBasicData']
  >([]);

  const [count, setCount] = useState(
    Math.floor(charactersBasicData.length / 24)
  );

  const paginateData = (
    page: number,
    data: CharacterSliceShape['charactersBasicData'],
    amountPerPage = 24
  ) => {
    if (!data || data.length < 1) return [];
    const from = amountPerPage * page - amountPerPage;
    const to = amountPerPage * page;
    return data.slice(from, to);
  };

  useEffect(() => {
    if (charactersBasicData) {
      setCharactersInPage(paginateData(currentPage, charactersBasicData));
      // setCount(Math.floor(charactersBasicData.length / 24));
    } else {
      setCharactersInPage(paginateData(currentPage, []));
      // setCount(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
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
            setCharactersInPage(paginateData(currentPage, charactersBasicData));
            setCount(Math.floor(charactersBasicData.length / 24));
          } else {
            setCharactersInPage(paginateData(currentPage, data));
            setCount(Math.floor(data.length / 24));
          }
        }}
      />
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          rowSpacing={4}
          marginTop={4}
          // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
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
          currentPage={currentPage}
          // count={
          //   charactersInPage ? Math.floor(charactersInPage.length / 24) : 0
          // }
          count={count}
          // handleChange={handlePaginationChange}
        />
      </Box>
    </>
  );
};

export default CharactersView;
