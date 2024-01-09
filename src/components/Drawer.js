import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ScioHorizontalIcon from '../icons/ScioHorizontalIcon';
import MissionIcon from '../icons/MissionIcon';
import MissionPage from '../pages/MissionPage';
import OsdPage from '../pages/OsdPage';
import DifPage from '../pages/DifPage';
import MountainIcon from '../icons/MountainIcon';
import DifIcon from '../icons/DifIcon';

const drawerWidth = 350;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    background: '#004F71',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

const MuiDrawerStyled = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      paddingLeft: theme.spacing(4),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      top: theme.spacing(9), // Adjust top property instead of marginTop
      position: 'relative', 
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

const Drawer = ({ open, handleDrawerClose }) =>  {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = React.useState('Mission');

  const handleListItemClick = (text) => {
    setSelectedItem(text);
  };

  const renderPage = () => {
    switch (selectedItem) {
      case 'Mission':
        return <MissionPage />;
      case 'Operations Strategy Deployment':
        return <OsdPage />;
      case 'Decision Intelligence Framework':
        return <DifPage />; 
      default:
        return null;
    }
  };

  const renderIcon = (index) => {
    switch (index) {
      case 0:
        return <MissionIcon />;
      case 1:
        return <MountainIcon />;
      case 2:
        return <DifIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      <MuiDrawerStyled variant="permanent" open={open}>
        <DrawerHeader>
        <ScioHorizontalIcon />
          <IconButton onClick={handleDrawerClose} style={{ color: '#fff' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Mission', 'Operations Strategy Deployment', 'Decision Intelligence Framework'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton 
                selected={selectedItem === text}
                onClick={() => handleListItemClick(text)}
                sx={{
                  color: '#4b384c',
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}  
                >
                  {renderIcon(index)}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </MuiDrawerStyled>
      <Main open={open}>
        {renderPage()}
      </Main>
    </>
  );
}

export default Drawer;
