import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Button, useTheme } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import navigationViews from '../routes/navigationViews';
import Sidebar from './Sidebar';
import RickAndMortyLogo from './icons/RickAndMortyLogo';

const Navbar = () => {
  const { palette } = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        position: 'absolute',
        top: 0,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none' },
            }}
          >
            <Sidebar />
          </Box>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Link to="/">
              <RickAndMortyLogo
                normalColor={false}
                height={45}
              />
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' },
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            {navigationViews.map(({ viewName, path, icon }) => (
              <Button
                component={NavLink}
                to={path}
                endIcon={icon}
                key={viewName}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'flex',
                  '&:hover': {
                    color: palette.secondary.main,
                  },
                  '&.active': {
                    color: palette.secondary.main,
                  },
                }}
              >
                {viewName}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
