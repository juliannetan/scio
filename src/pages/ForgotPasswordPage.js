import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../components/supabase';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/system';
import { Typography, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import Alert from '@mui/material/Alert';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(scio_logo2017_dark-blue.png);
  background-color: #004F71;
  background-size: 780px 780px;
  background-position: center;
  background-repeat: no-repeat;
`;

const Content = styled.div`
  text-align: center;
  max-width: 400px; /* Adjust the width as needed */
  width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 60px;
  color: ${grey[300]};
`;

const Input = muiStyled(TextField)({
  width: '100%',
  marginBottom: '20px',
  '& label': {
    color: grey[300],
  },
  '& label.Mui-focused': {
    color: grey[300],
  },
  '& input': {
    color: grey[300],
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: grey[300],
  },
  '&&:hover .MuiInput-underline:before': {
    borderBottomColor: grey[700],
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: grey[700],
  },
});

const ColorButton = muiStyled(Button)({
  width: '100%',
  color: grey[300],
  backgroundColor: grey[500],
  '&:hover': {
    backgroundColor: grey[700],
  },
  padding: '5px',
  opacity: 0.9,
  fontSize: '20px',
  textTransform: 'capitalize',
});

const LinkStyled = styled(Link)`
  color: ${grey[300]};
  text-decoration: none;
  font-size: 14px;
`;

const ForgotPasswordPage = ({setToken}) => {
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorAlertOpen, setErrorAlertOpen] = React.useState(true);
  const [successAlertOpen, setSuccessAlertOpen] = React.useState(true);
  const [isVerificationMode, setIsVerificationMode] = useState(false);
  const navigate = useNavigate();

  const handleErrorAlertClose = () => {
    setErrorAlertOpen(false);
  };

  const handleSuccessAlertClose = () => {
    setSuccessAlertOpen(false);
  };

  const signInWithEmail = async () => {
    try {
      if (!username) {
        setError('Please enter your email');
        setSuccessMessage('');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(username)) {
        setError('Please enter a valid email address');
        setSuccessMessage('');
        return;
      }

      const { user, error } = await supabase.auth.signInWithOtp({
        email: username,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        setError(error.message);
        setSuccessMessage('');
        console.error('Error sending OTP verification code: ', error.message);
        return;
      }

      setSuccessMessage('An OTP verification code has been sent to your email');
      setError('');
      setIsVerificationMode(true); // Enter verification mode
    } catch (error) {
      setSuccessMessage('');
      setError(error.message);
      console.error('Error sending OTP verification code', error.message);
    }
  };

  const handleVerificationCodeSubmit = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.verifyOtp({
        email: username,
        token: verificationCode,
        type: 'email',
      });

      if (error) {
        setError(error.message);
        console.error('Error verifying OTP:', error.message);
        return;
      }

      // Handle successful verification, e.g., navigate to a new page
      console.log(session);
      setToken(session);
      console.log('OTP Verified. Session:', session);
      // Add your navigation logic here
      navigate('/scio/home');
    } catch (error) {
      setError(error.message);
      console.error('Error verifying OTP:', error.message);
    }
  };

  return (
    <Container>
      <Content>
        <Title>{isVerificationMode ? 'Verify OTP' : 'OTP Verification'}</Title>
        {error && errorAlertOpen && <Alert severity='error' onClose={handleErrorAlertClose}>{error}</Alert>}
        {successMessage && successAlertOpen && <Alert severity='success' onClose={handleSuccessAlertClose}>{successMessage}</Alert>}
        {!isVerificationMode ? (
          <>
            <Typography style={{ marginTop: '30px', color: grey[500] }}>
              Enter email to send a One Time Password
            </Typography>
            <Input
              style={{ marginTop: '20px' }}
              label="Email"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  signInWithEmail();
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
            <Input
              style={{ marginTop: '20px' }}
              label="Verification Code"
              variant="standard"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleVerificationCodeSubmit();
                }
              }}
            />
            <ColorButton onClick={handleVerificationCodeSubmit}>Sign In</ColorButton>
          </>
        )}
        <Typography style={{ marginTop: '30px', color: grey[500] }}>
          Already have an account? <LinkStyled to='/scio/verification-page' style={{ color: 'white' }}>Login</LinkStyled>
        </Typography>
      </Content>
    </Container>
  );
};

export default ForgotPasswordPage;
