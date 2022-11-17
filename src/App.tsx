import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import store from './store';
import { hydrate } from './store/slices/characterSlice';
import { CharacterSliceShape } from './store/slices/types';

const App = () => {
  const getFavoritesFromLocalStorage = () => {
    try {
      const persistedState = localStorage.getItem('favs');
      if (persistedState)
        return JSON.parse(persistedState) as CharacterSliceShape;
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const favorites = getFavoritesFromLocalStorage();
    if (favorites) store.dispatch(hydrate(favorites));
  }, []);

  const content = useRoutes(routes);
  return content;
};

export default App;
