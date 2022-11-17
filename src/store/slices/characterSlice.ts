import { createSlice } from '@reduxjs/toolkit';
import { CharacterSliceShape } from './types';

const initialState: CharacterSliceShape = {
  favorites: {
    characters: [],
    episodes: [],
  },
};

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
});

export const { setFavoriteCharacter, setFavoriteEpisode, hydrate } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
