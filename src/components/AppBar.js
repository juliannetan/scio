import * as React from 'react'
import { alpha, styled } from '@mui/material/styles'
import {
  Box,
  Badge,
  CssBaseline,
  Toolbar,
  IconButton,
  InputBase,
  Button,
} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Drawer from './Drawer'
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import { supabase } from './supabase'
import ProfileCard from './ProfileCard'
import { styled as muiStyled } from '@mui/system'
import { grey } from '@mui/material/colors'

export const StyledButton = muiStyled(Button)`
  color: ${grey[300]};
  background-color: none;
  padding: 2px 20px;
  font-size: 20px;
  text-transform: capitalize;

  &:hover {
    background-color: none;
  }
`

const MenuStyled = styled(Menu)`
  .MuiList-root.MuiList-padding {
    padding: 0 !important;
  }
`

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
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

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
}))

const drawerWidth = 350

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
}))

const AppBar = ({ token, onSignOut }) => {
  const [open, setOpen] = React.useState(true)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [userData, setUserData] = React.useState(null)
  const [selectedItem, setSelectedItem] = React.useState('Strategy Deployment')
  const [subMenuItem, setSubMenuItem] = React.useState('')
  const [showSubItems, setShowSubItems] = React.useState(true)
  let navigate = useNavigate()

  React.useEffect(() => {
    if (!token) {
      navigate('/scio')
    } else if (!userData && token) {
      fetchUserData()
    }
  }, [token, navigate, userData])

  const fetchUserData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUserData(user)
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    onSignOut()
    navigate('/scio')
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  function stringAvatar(name) {
    return {
      children: `${name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()}`,
    }
  }

  const handleRenderMenuItem = (selectedItem) => {
    setSelectedItem(selectedItem)
    setSubMenuItem('')
    setShowSubItems(false)
  }

  const handleRenderSubMenuItem = (subMenuItem) => {
    setSubMenuItem(subMenuItem)
  }

  return (
    <>
      {token && (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <MuiAppBarStyled position='fixed' open={open}>
            <Toolbar>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <StyledButton onClick={() => handleRenderMenuItem(selectedItem)}>
                {selectedItem}
              </StyledButton>
              {subMenuItem && (
                <>
                  {` > `}
                  <StyledButton
                    onClick={() => handleRenderSubMenuItem(subMenuItem)}
                  >
                    {`${subMenuItem}`}
                  </StyledButton>
                </>
              )}
              <Box sx={{ flexGrow: 1 }} />
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder='Search…'
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>

              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size='large'
                  aria-label='show 17 new notifications'
                  color='inherit'
                >
                  <Badge badgeContent={17} color='error'>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <Box sx={{ flexGrow: 0 }}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      {...stringAvatar(
                        userData?.user_metadata?.full_name || '',
                      )}
                    />
                  </IconButton>

                  <MenuStyled
                    sx={{ mt: '48px' }}
                    id='menu-appbar'
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
                    <ProfileCard handleLogout={handleLogout} />
                  </MenuStyled>
                </Box>
              </Box>
            </Toolbar>
          </MuiAppBarStyled>
          <Drawer
            open={open}
            handleDrawerClose={handleDrawerClose}
            setSelectedItem={setSelectedItem}
            setSubMenuItem={setSubMenuItem}
            setShowSubItems={setShowSubItems}
            showSubItems={showSubItems}
            subMenuItem={subMenuItem}
            selectedItem={selectedItem}
          />
        </Box>
      )}
    </>
  )
}

export default AppBar
