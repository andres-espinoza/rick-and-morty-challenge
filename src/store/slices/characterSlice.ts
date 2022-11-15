import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CharacterShape, CharacterSliceShape } from './types';
import CharactersService from '../../services/characters/index';
import { GetCharactersBasicData_characters } from '../../services/characters/__generated__/GetCharactersBasicData';

const initialState: CharacterSliceShape = {
  charactersBasicData: null,
  loading: false,
  error: null,
};

export const getCharactersBasicData = createAsyncThunk<
  GetCharactersBasicData_characters['results']
>('characters/getAllBasicData', async (_, thunkAPI) => {
  try {
    const characters = await CharactersService.getAllCharactersBasicData();
    return characters;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setFavoriteCharacter: (
      { charactersBasicData },
      {
        payload: { id, favorite },
      }: { payload: { id: string; favorite: boolean } }
    ) => {
      if (charactersBasicData && charactersBasicData.length > 0) {
        const characterIndex = charactersBasicData.findIndex(
          (character) => character?.id === id
        );
        if (characterIndex > -1) {
          (charactersBasicData[characterIndex] as CharacterShape).favorite =
            favorite;
        }
      }
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
