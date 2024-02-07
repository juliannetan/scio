import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'

function stringAvatar(name) {
  return {
    children: `${name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()}`,
  }
}

const ProfileCard = ({ userData, handleLogout }) => {

  return (
    <Card sx={{ width: 250 }}>
      <CardMedia
        sx={{
          height: 140,
          background:
            'linear-gradient(to bottom, rgba(25, 118, 210, 0.08) 50%, transparent 50%)',
          position: 'relative',
        }}
      >
        <Avatar
          {...stringAvatar(userData?.user_metadata?.full_name || '')}
          sx={{
            width: 64,
            height: 64,
            backgroundColor: '#004F71',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        />
      </CardMedia>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '-40px',
        }}
      >
        {userData ? (
          <>
            <Typography gutterBottom variant='h5' component='div'>
              {userData.user_metadata.full_name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {userData.email}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {userData.user_metadata.company}
            </Typography>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </CardContent>
      <CardActions sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Divider sx={{ width: '100%', my: 1 }} />
        <Button size='small' onClick={handleLogout}>
          Logout
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProfileCard
