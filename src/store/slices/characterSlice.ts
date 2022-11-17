import { createSlice } from '@reduxjs/toolkit';
import { CharacterSliceShape } from './types';

const initialState: CharacterSliceShape = {
  favorites: {
    characters: [],
    episodes: [],
  },
};

// export const getCharactersBasicData = createAsyncThunk<
//   CharacterSliceShape['charactersBasicData']
// >('characters/getAllBasicData', async (_, thunkAPI) => {
//   try {
//     const characters = await CharacterService.getAllCharactersBasicData();
//     if (characters) {
//       return characters.filter(
//         (character) => character !== null
//       ) as CharacterSliceShape['charactersBasicData'];
//     }
//     return [];
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    hydrate: (_state, action) => {
      return action.payload as CharacterSliceShape;
    },
    setFavoriteCharacter: (state, { payload: id }: { payload: string }) => {
      const favoriteRemoved = state.favorites.characters.filter(
        (favId) => favId !== id
      );
      const favoriteAdded = [...state.favorites.characters, id];
      state.favorites.characters = state.favorites.characters.includes(id)
        ? favoriteRemoved
        : favoriteAdded;
    },
    setFavoriteEpisode: (state, { payload: id }: { payload: string }) => {
      const favoriteRemoved = state.favorites.episodes.filter(
        (favId) => favId !== id
      );
      const favoriteAdded = [...state.favorites.episodes, id];
      state.favorites.episodes = state.favorites.episodes.includes(id)
        ? favoriteRemoved
        : favoriteAdded;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getCharactersBasicData.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(getCharactersBasicData.fulfilled, (state, { payload }) => {
  //       state.charactersBasicData = payload;
  //       state.loading = false;
  //     })
  //     .addCase(getCharactersBasicData.rejected, (state, { payload }) => {
  //       state.error = payload as string;
  //       state.loading = false;
  //     });
  // },
});

export const { setFavoriteCharacter, setFavoriteEpisode, hydrate } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
