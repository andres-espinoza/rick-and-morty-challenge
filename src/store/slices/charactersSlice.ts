import { createSlice } from '@reduxjs/toolkit';
import { ICharactersSlice } from './types';

const initialState: ICharactersSlice = {
  charactersPage: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharactersPage(state, action) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-param-reassign
      state.charactersPage = action.payload;
    },
  },
});

export const { setCharactersPage } = charactersSlice.actions;
export default charactersSlice.reducer;
