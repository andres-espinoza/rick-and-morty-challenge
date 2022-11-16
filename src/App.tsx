import { useRoutes } from 'react-router-dom';
import routes from './routes';

const App = () => {
  // const dispatch = useAppDispatch();
  // const { loading, error, charactersBasicData } = useAppSelector(
  //   (state) => state.characters
  // );

  // const initCharacters = useCallback(async () => {
  //   await dispatch(getCharactersBasicData());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (!charactersBasicData.length) {
  //     initCharacters().catch((err) => console.log(err));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const content = useRoutes(routes);
  return content;
};

export default App;
