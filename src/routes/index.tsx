import { Suspense, lazy, ElementType } from 'react';
import { RouteObject } from 'react-router-dom';
import Loader from '../components/Loader';
import MainContainer from '../layouts/MainContainer';

// eslint-disable-next-line react/display-name
const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

const CharactersView = Loadable(lazy(() => import('../views/CharacterView')));
const EpisodesView = Loadable(lazy(() => import('../views/EpisodeView')));
const Home = Loadable(lazy(() => import('../views/Home')));
const CharacterDetails = Loadable(
  lazy(() => import('../views/CharacterDetails'))
);
const EpisodeDetails = Loadable(lazy(() => import('../views/EpisodeDetails')));
const NotFound = Loadable(lazy(() => import('../views/NotFound')));

const routes: RouteObject[] = [
  {
    element: <MainContainer />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'characters',
        element: <CharactersView />,
      },
      {
        path: 'characters/details/:characterId',
        element: <CharacterDetails />,
      },
      {
        path: 'episodes',
        element: <EpisodesView />,
      },
      {
        path: 'episodes/details/:episodeId',
        element: <EpisodeDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <MainContainer />,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
