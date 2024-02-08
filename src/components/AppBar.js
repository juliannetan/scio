import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  Button,
} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
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
  const [open, setOpen] = useState(true)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [selectedItem, setSelectedItem] = useState('Strategy Deployment')
  const [subMenuItem, setSubMenuItem] = useState('')
  const [showSubItems, setShowSubItems] = useState(true)
  const [generatedId, setGeneratedId] = useState(null)
  const [providedId, setProvidedId] = useState('')
  const [userFullName, setUserFullName] = useState('')

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
        setUserFullName(userData?.user_metadata?.full_name || '')
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


              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
                    <ProfileCard
                      userData={userData}
                      handleLogout={handleLogout}
                    />
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
            generatedId={generatedId}
            setGeneratedId={setGeneratedId}
            providedId={providedId}
            setProvidedId={setProvidedId}
            userData={userData}
          />
        </Box>
      )}
    </>
  )
}

export default AppBar
