import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, Badge, CssBaseline, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Drawer from './Drawer';
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { supabase } from './supabase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const drawerWidth = 350;

const MuiAppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#004F71',
  ...(open && {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = ({ token, onSignOut }) => {
  const [open, setOpen] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userData, setUserData] = React.useState(null);
  const [isMagicLinkRedirect, setIsMagicLinkRedirect] = React.useState(false);
  const settings = ['Profile', 'Logout'];
  let navigate = useNavigate();

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const redirectToParam = queryParams.get('redirect_to');

    if (!token && redirectToParam) {
      setIsMagicLinkRedirect(true);
    }

    if (!token && !isMagicLinkRedirect) {
      navigate('/scio');
    } else 
    if (!userData && token) {
      fetchUserData();
    }
  }, [token, navigate, userData, isMagicLinkRedirect]);

  const fetchUserData = async () => {
    try {
      const { user, error } = await supabase.auth.api.getUser(token.access_token);

      if (error) {
        console.error('Error fetching user data:', error.message);
      } else {
        setUserData(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    onSignOut();
    navigate('/scio');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getInitials = (fullName) => {
    const nameParts = fullName.split(' ');
    const initials = nameParts.map((part) => part.charAt(0)).join('').toUpperCase();
    return initials;
  };

  return (
    <>
    {(token || isMagicLinkRedirect) && (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MuiAppBarStyled position="fixed" open={open}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{ mr: 2,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />

            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
            </Typography>


            <Box sx={{ flexGrow: 1 }} />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>


            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={getInitials('jane doe')} />
                </IconButton>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu }>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            </Box>
          </Toolbar>
        </MuiAppBarStyled>
        <Drawer open={open} handleDrawerClose={handleDrawerClose} />

      </Box>
    )}
    </>
  );
}

export default AppBar
