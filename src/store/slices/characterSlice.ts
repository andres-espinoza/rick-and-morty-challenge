import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CharacterSliceShape } from './types';
import CharactersService from '../../services/characters/index';

const initialState: CharacterSliceShape = {
  charactersBasicData: [],
  loading: false,
  error: null,
  favorites: [],
  // select: []
};

export const getCharactersBasicData = createAsyncThunk<
  CharacterSliceShape['charactersBasicData']
>('characters/getAllBasicData', async (_, thunkAPI) => {
  console.log('aah!');
  try {
    const characters = await CharactersService.getAllCharactersBasicData();
    if (characters) {
      return characters.filter(
        (character) => character !== null
      ) as CharacterSliceShape['charactersBasicData'];
    }
    console.log(characters);
    return [];
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    // setFavoriteCharacter: (
    //   { charactersBasicData },
    //   {
    //     payload: { id, favorite },
    //   }: { payload: { id: string; favorite: boolean } }
    // ) => {
    //   if (charactersBasicData && charactersBasicData.length > 0) {
    //     const characterIndex = charactersBasicData.findIndex(
    //       (character) => character?.id === id
    //     );
    //     if (characterIndex > -1) {
    //       (charactersBasicData[characterIndex] as CharacterShape).favorite =
    //         favorite;
    //     }
    //   }
    // },
    setFavoriteCharacter: (state, { payload: id }: { payload: string }) => {
      const favoriteRemoved = state.favorites.filter((favId) => favId !== id);
      const favoriteAdded = [...state.favorites, id];
      state.favorites = state.favorites.includes(id)
        ? favoriteRemoved
        : favoriteAdded;
      console.log(state.favorites);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharactersBasicData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCharactersBasicData.fulfilled, (state, { payload }) => {
        state.charactersBasicData = payload;
        state.loading = false;
      })
      .addCase(getCharactersBasicData.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.loading = false;
      });
  },
});

export const { setFavoriteCharacter } = charactersSlice.actions;
export default charactersSlice.reducer;
