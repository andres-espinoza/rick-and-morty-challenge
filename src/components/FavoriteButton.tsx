import { IconButton } from '@mui/material';
import { CSSProperties } from 'react';
import { OutlinedFavoriteIcon, SolidFavoriteIcon } from './icons';

type TypeComponent = 'EpisodeCard' | 'CharacterDetails';

interface FavoriteButtonProps {
  favorite: boolean;
  handleClick: () => void;
  typeComponent?: TypeComponent;
}

const FavoriteButton = ({
  favorite,
  handleClick,
  typeComponent,
}: FavoriteButtonProps) => {
  let styles: CSSProperties = {};
  if (typeComponent === 'EpisodeCard') {
    styles = {
      position: 'absolute',
      top: '10px',
      right: '10px',
    };
  }
  if (typeComponent === 'CharacterDetails') {
    styles = {
      position: 'absolute',
      top: '10px',
      right: '10px',
    };
  }
  return (
    <IconButton
      aria-label="add to favorites"
      onClick={handleClick}
      sx={styles}
    >
      {favorite ? (
        <SolidFavoriteIcon
          color="primary"
          sx={{
            fontSize: typeComponent === 'CharacterDetails' ? 40 : 30,
          }}
        />
      ) : (
        <OutlinedFavoriteIcon
          color="primary"
          sx={{
            fontSize: typeComponent === 'CharacterDetails' ? 40 : 30,
          }}
        />
      )}
    </IconButton>
  );
};

export default FavoriteButton;
