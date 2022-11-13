import { Box, Grid } from '@mui/material';
import { useCallback, useEffect } from 'react';
import CustomCard from '../components/CustomCard';
import { useAppDispatch, useAppSelector } from '../store';
import { getCharactersBasicData } from '../store/slices/characterSlice';

const CharactersView = () => {
  const dispatch = useAppDispatch();
  const { charactersBasicData, loading } = useAppSelector(
    (state) => state.characters
  );

  const initCharacters = useCallback(async () => {
    await dispatch(getCharactersBasicData());
  }, [dispatch]);

  useEffect(() => {
    initCharacters().catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>Characters View</div>
      {loading ? <h1>...Loading</h1> : null}
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          rowSpacing={4}
          // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {!loading && charactersBasicData && charactersBasicData.length > 0
            ? charactersBasicData.map((character) => (
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
                  />
                </Grid>
              ))
            : null}
        </Grid>
      </Box>
    </>
  );
};

export default CharactersView;
