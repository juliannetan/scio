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
import MissionPage from '../pages/MissionPage';
import OsdPage from '../pages/OsdPage';
import DifPage from '../pages/DifPage';
import MountainIcon from '../icons/MountainIcon';
import DifIcon from '../icons/DifIcon';
import TitleBlockPage from '../pages/TitleBlockPage';
import ProblemblockPage from '../pages/ProblemblockPage';
import CurrentblockPage from '../pages/CurrentblockPage';
import FutureblockPage from '../pages/FutureblockPage';
import SolutionblockPage from '../pages/SolutionblockPage';
import DecisionblockPage from '../pages/DecisionblockPage';
import ImplementationblockPage from '../pages/ImplementationblockPage';
import ValueblockPage from '../pages/ValueblockPage';
import LessonsblockPage from '../pages/LessonsblockPage';
import GlanceA3Canvas from '../pages/GlanceA3Canvas';

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
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
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
  const [selectedItem, setSelectedItem] = React.useState('Strategy Deployment');
  const [subMenuItem, setSubMenuItem] = React.useState(null);
  const [showSubItems, setShowSubItems] = React.useState(true); 
  const [renderA3Canvas, setRenderA3Canvas] = React.useState(false);

  const handleListItemClick = (text) => {
    setSelectedItem(text);
    setRenderA3Canvas(false);
    setSubMenuItem(null); // Reset sub-menu item when main menu item is clicked
    setShowSubItems(false); // Add this line to hide sub-items when clicking a main menu item
  };

  const handleSubMenuItemClick = (text) => {
    setSubMenuItem(text);
    setRenderA3Canvas(false);
  };

  const renderPage = () => {
    switch (selectedItem) {
      case 'Strategy Deployment':
        return <><MissionPage /><OsdPage /></>;
      case 'Decision Intelligence Framework':
        return <DifPage setSubMenuItem={setSubMenuItem} setShowSubItems={setShowSubItems} setRenderA3Canvas={setRenderA3Canvas} />;
        default:
        return null;
    }
  };

  const renderSubPage = () => {
    switch (subMenuItem) {
      case 'Title':
        return <TitleBlockPage setNextPage={() => setSubMenuItem('Problem Statement')} />;
      case 'Problem Statement':
        return <ProblemblockPage setNextPage={() => setSubMenuItem('Current State')}/>;
      case 'Current State':
        return <CurrentblockPage setNextPage={() => setSubMenuItem('Future State')}/>;
      case 'Future State':
        return <FutureblockPage setNextPage={() => setSubMenuItem('Solution Evaluation')}/>;
      case 'Solution Evaluation':
        return <SolutionblockPage setNextPage={() => setSubMenuItem('Decision')}/>;
      case 'Decision':
        return <DecisionblockPage setNextPage={() => setSubMenuItem('Implementation Plan')}/>;
      case 'Implementation Plan':
        return <ImplementationblockPage setNextPage={() => setSubMenuItem('Value Delivery')}/>;
      case 'Value Delivery':
        return <ValueblockPage setNextPage={() => setSubMenuItem('Lessons Learned')}/>;
      case 'Lessons Learned':
        return <LessonsblockPage setNextPage={() => handleListItemClick('Decision Intelligence Framework')} />;
        case 'A3 Canvas':
          return <GlanceA3Canvas />;
        default:
        return null;
    }
  };

  const renderIcon = (index) => {
    switch (index) {
      case 0:
        return <MountainIcon />;
      case 1:
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
          {['Strategy Deployment', 'Decision Intelligence Framework'].map((text, index) => (
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
          {selectedItem === 'Decision Intelligence Framework' && showSubItems && (
            <>
              <Divider />
              <List>
                {['Title', 'Problem Statement', 'Current State', 'Future State', 'Solution Evaluation', 'Decision', 'Implementation Plan', 'Value Delivery', 'Lessons Learned'].map((text) => (
                  <ListItem key={text} disablePadding onClick={() => handleSubMenuItemClick(text)}>
                    <ListItemButton
                    selected={subMenuItem === text}
                    onClick={() => handleSubMenuItemClick(text)}
                    sx={{
                      color: '#4b384c',
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    >
                      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, marginLeft: '80px' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </List>
      </MuiDrawerStyled>
      <Main open={open}>
      {renderA3Canvas ? <GlanceA3Canvas /> : (subMenuItem ? renderSubPage() : renderPage())}
      </Main>
    </>
  );
}

export default Drawer;
