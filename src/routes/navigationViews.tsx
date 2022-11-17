import {
  SearchEpisodeIcon,
  SearchCharacterIcon,
  // SolidFavoriteIcon,
} from '../components/icons';

interface ViewItem {
  viewName: string;
  path: string;
  icon?: JSX.Element;
  children?: ViewItem[];
}

const navigationViews: ViewItem[] = [
  {
    viewName: 'Characters',
    path: '/characters',
    icon: <SearchCharacterIcon />,
  },
  {
    viewName: 'Episodes',
    path: '/episodes',
    icon: <SearchEpisodeIcon />,
  },
  // {
  //   viewName: 'Favorites',
  //   path: '/favorites',
  //   icon: <SolidFavoriteIcon />,
  // },
];

export default navigationViews;
