import React, { useState } from 'react'
import { supabase } from '../components/supabase'
import { Typography, IconButton, InputAdornment } from '@mui/material'
import { grey } from '@mui/material/colors'
import Alert from '@mui/material/Alert'
import {
  Container,
  Title,
  Content,
  Input,
  ColorButton,
  LinkStyled,
  VisibilityIcon,
  VisibilityOffIcon,
} from './SignInPage'

const SignUpPage = () => {
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorAlertOpen, setErrorAlertOpen] = React.useState(true)
  const [successAlertOpen, setSuccessAlertOpen] = React.useState(true)

  const handleErrorAlertClose = () => {
    setErrorAlertOpen(false)
  }

  const handleSuccessAlertClose = () => {
    setSuccessAlertOpen(false)
  }

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company: companyName,
          },
          emailRedirectTo: `${window.location.origin}/scio`,
        },
      })

      if (error) {
        setError(error.message)
        setSuccessMessage('')
        console.error('Error signing up:', error.message)
        return
      }

      setSuccessMessage('Check your email to confirm sign-up')
      setError('')
    } catch (error) {
      setError(error.message)
      setSuccessMessage('')
      console.error('Error signing up:', error.message)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSignUp()
    }
  }

  return (
    <Container>
      <Content>
        <Title>Sign Up</Title>
        {error && errorAlertOpen && (
          <Alert severity='error' onClose={handleErrorAlertClose}>
            {error}
          </Alert>
        )}
        {successMessage && successAlertOpen && (
          <Alert severity='success' onClose={handleSuccessAlertClose}>
            {successMessage}
          </Alert>
        )}
        <Input
          style={{ marginTop: '20px' }}
          variant='standard'
          label='Full Name'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          variant='standard'
          label='Email Address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          variant='standard'
          label='Company Name'
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Input
          type={showPassword ? 'text' : 'password'}
          variant='standard'
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  tabIndex='-1'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          variant='standard'
          label='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  tabIndex='-1'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ColorButton onClick={handleSignUp}>Sign Up</ColorButton>
        <Typography style={{ marginTop: '30px', color: grey[500] }}>
          Already have an account? <LinkStyled to='/scio/'>Login</LinkStyled>
        </Typography>
      </Content>
    </Container>
  )
}

export default SignUpPage
