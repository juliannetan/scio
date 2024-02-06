import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../components/supabase'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import Alert from '@mui/material/Alert'
import OTPInput from 'react-otp-input'
import {
  Container,
  Title,
  Content,
  Input,
  ColorButton,
  LinkStyled,
} from './SignInPage'

const OTPContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`

const ForgotPasswordPage = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorAlertOpen, setErrorAlertOpen] = React.useState(true)
  const [successAlertOpen, setSuccessAlertOpen] = React.useState(true)
  const [isVerificationMode, setIsVerificationMode] = useState(false)
  const navigate = useNavigate()

  const handleErrorAlertClose = () => {
    setErrorAlertOpen(false)
  }

  const handleSuccessAlertClose = () => {
    setSuccessAlertOpen(false)
  }

  const signInWithEmail = async () => {
    try {
      if (!username) {
        setError('Please enter your email')
        setSuccessMessage('')
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(username)) {
        setError('Please enter a valid email address')
        setSuccessMessage('')
        return
      }

      const { user, error } = await supabase.auth.signInWithOtp({
        email: username,
        options: {
          shouldCreateUser: false,
        },
      })

      if (error) {
        setError(error.message)
        setSuccessMessage('')
        console.error('Error sending OTP verification code: ', error.message)
        return
      }

      setSuccessMessage('An OTP verification code has been sent to your email')
      setError('')
      setIsVerificationMode(true)
    } catch (error) {
      setSuccessMessage('')
      setError(error.message)
      console.error('Error sending OTP verification code', error.message)
    }
  }

  const handleVerificationCodeSubmit = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        email: username,
        token: verificationCode,
        type: 'email',
      })

      if (error) {
        setError(error.message)
        console.error('Error verifying OTP:', error.message)
        return
      }

      console.log(session)
      setToken(session)
      console.log('OTP Verified. Session:', session)
      navigate('/scio/home')
    } catch (error) {
      setError(error.message)
      console.error('Error verifying OTP:', error.message)
    }
  }

  return (
    <Container>
      <Content>
        <Title>{isVerificationMode ? 'Verify OTP' : 'OTP Verification'}</Title>
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
        {!isVerificationMode ? (
          <>
            <Typography style={{ marginTop: '30px', color: grey[500] }}>
              Enter email to send a One Time Password
            </Typography>
            <Input
              style={{ marginTop: '20px' }}
              label='Email'
              variant='standard'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  signInWithEmail()
                }
              }}
            />
            <ColorButton onClick={signInWithEmail}>Get Code</ColorButton>
          </>
        ) : (
          <>
            <Typography style={{ marginTop: '30px', color: grey[500] }}>
              Enter the 6-digit verification code sent to your email
            </Typography>
            <OTPContainer>
              <OTPInput
                value={verificationCode}
                onChange={setVerificationCode}
                numInputs={6}
                isInputNum={true}
                shouldAutoFocus={true}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  border: `1px solid ${grey[500]}`,
                  borderRadius: '8px',
                  width: '54px',
                  height: '64px',
                  fontSize: '30px',
                  color: '#000',
                  fontWeight: '400',
                  caretColor: grey[700],
                  margin: '0 5px',
                  backgroundColor: grey[300],
                }}
                focusStyle={{
                  border: '1px solid #CFD3DB',
                  outline: 'none',
                }}
              />
            </OTPContainer>
            <ColorButton onClick={handleVerificationCodeSubmit}>
              Sign In
            </ColorButton>
          </>
        )}
        <Typography style={{ marginTop: '30px', color: grey[500] }}>
          Already have an account?{' '}
          <LinkStyled to='/scio' style={{ color: 'white' }}>
            Login
          </LinkStyled>
        </Typography>
      </Content>
    </Container>
  )
}

export default ForgotPasswordPage
