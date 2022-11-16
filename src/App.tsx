import { useCallback, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import useScrollReset from './hooks/useScrollTop';
import routes from './routes';
import { useAppDispatch, useAppSelector } from './store';
import { getCharactersBasicData } from './store/slices/characterSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const { loading, error, charactersBasicData } = useAppSelector(
    (state) => state.characters
  );

  const initCharacters = useCallback(async () => {
    await dispatch(getCharactersBasicData());
  }, [dispatch]);

  useEffect(() => {
    if (!charactersBasicData.length) {
      initCharacters().catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useScrollReset();
  const content = useRoutes(routes);
  return !loading && !error ? content : <h2>Something went wrong!</h2>;
};

export default App;
