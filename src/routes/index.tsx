/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */ // => pide un display name para el Component del Suspense
import { Suspense, lazy, ElementType } from 'react';
import { RouteObject } from 'react-router-dom';
import MainContainer from '../layouts/MainContainer';

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<h4>Cargando...</h4>}>
      <Component {...props} />
    </Suspense>
  );

const CharactersView = Loadable(lazy(() => import('../views/CharacterView')));
const EpisodesView = Loadable(lazy(() => import('../views/EpisodeView')));
const FavoritesView = Loadable(lazy(() => import('../views/FavoritesView')));
const Home = Loadable(lazy(() => import('../views/Home')));

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
        path: 'episodes',
        element: <EpisodesView />,
      },

      {
        path: 'favorites',
        element: <FavoritesView />,
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
