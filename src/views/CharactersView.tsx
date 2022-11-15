import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomCard from '../components/CustomCard';
import CustomPagination from '../components/Pagination';
import useQueryParams from '../hooks/useQueryParams';
import { useAppSelector } from '../store';
import { CharacterSliceShape } from '../store/slices/types';

const CharactersView = () => {
  const { charactersBasicData, loading } = useAppSelector(
    (state) => state.characters
  );

  const queryParams = useQueryParams();
  const currentPage = Number(queryParams.get('page')) || 1;

  const [charactersPage, setCharactersPage] =
    useState<CharacterSliceShape['charactersBasicData']>(null);

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
      setCharactersPage(paginateData(currentPage, charactersBasicData));
    }
  }, [currentPage, charactersBasicData]);
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
      {loading ? <h1>...Loading</h1> : null}
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          rowSpacing={4}
          marginTop={4}
          // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {!loading && charactersPage && charactersPage.length > 0
            ? charactersPage.map((character) => (
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
                    favorite={
                      character?.favorite === undefined
                        ? false
                        : character.favorite
                    }
                  />
                </Grid>
              ))
            : null}
        </Grid>
        <CustomPagination
          currentPage={currentPage}
          // handleChange={handlePaginationChange}
        />
      </Box>
    </>
  );
};

export default CharactersView;
