import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Drawer as MuiDrawer, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MountainIcon from '../icons/MountainIcon';
import DifIcon from '../icons/DifIcon';
import DifPage from '../pages/DifPage'
import MissionPage from '../pages/MissionPage'

const drawerWidth = 350;

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  
const Drawer = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const decisions = ['Option A', 'Option B', 'Option C']

  return (
    <>
    <MuiDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Operations Strategy Deployment', 'Decision Intelligence Framework'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <MountainIcon /> : <DifIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    </MuiDrawer>
    <Main open={open}>
      <DrawerHeader />
        {/* <MissionPage /> */}
        <DifPage decisions={decisions} />
    </Main>
    </>
  );
};

export default Drawer;
