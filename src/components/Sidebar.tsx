import { useState } from 'react';
import {
  Box,
  Stack,
  useTheme,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, MenuIcon } from './icons';
import RickAndMortyLogo from './icons/RickAndMortyLogo';
import navigationViews from '../routes/navigationViews';
import { BorderRadius } from '../theme';

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    // e.preventDefault();
    navigate(path);
    setOpenSidebar(false);
  };

  const openSideBar =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpenSidebar(open);
    };

  const {
    palette: {
      primary: { main },
    },
  } = useTheme();

  const modulesList = () => (
    <Box
      gap={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      onKeyDown={openSideBar(false)}
    >
      <Typography variant="subtitle2">Módulos</Typography>
      <List role="menu">
        {navigationViews.map(({ viewName, icon, path }) => (
          <ListItem
            key={viewName}
            disablePadding
            role="menuitem"
          >
            <ListItemButton
              onClick={() => handleNavigation(path)}
              selected={path === pathname}
              sx={{
                '&.active': {
                  '&&:nth-of-type(n+1) svg': {
                    color: main,
                  },
                  '&&:nth-of-type(n+1) p': {
                    color: main,
                  },
                },
                borderRadius: 1,
                '&:hover:nth-of-type(n+1) svg': {
                  color: main,
                },
                ':hover:nth-of-type(n+1) p': {
                  color: main,
                },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText secondary={viewName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={openSideBar(true)}
      >
        <MenuIcon
          sx={{
            color: 'background.paper',
          }}
        />
      </IconButton>

      <Drawer
        anchor="left"
        open={openSidebar}
        onClose={openSideBar(false)}
        role="presentation"
        sx={{
          boxShadow: 1,
          '& .MuiDrawer-paper': {
            width: '250px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: '1rem',
            borderTopRightRadius: 10,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          position="relative"
          sx={{
            backgroundColor: main,
            padding: '5px 0px',
            borderRadius: BorderRadius.Filter,
            marginBottom: 3,
          }}
        >
          <RickAndMortyLogo
            height={50}
            normalColor={false}
          />
          <IconButton
            onClick={openSideBar(false)}
            aria-label="close menu"
            sx={{
              position: 'absolute',
              right: 0,
            }}
          >
            <ChevronLeft
              sx={{
                color: 'background.paper',
              }}
            />
          </IconButton>
        </Stack>
        {modulesList()}
      </Drawer>
    </>
  );
};

export default Sidebar;
