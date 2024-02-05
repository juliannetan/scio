import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  color: white;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const SuccessMessage = styled.div`
  color: white;
  margin-bottom: 10px;
`;

const Input = muiStyled(TextField)({
  width: '100%',
  marginBottom: '20px',
  '& label': {
    color: grey[300],
  },
  '& label.Mui-focused': {
    color: grey[300]
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
  color: white;
  text-decoration: none;
  font-size: 14px;
`;


const ForgotPasswordPage = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
    
        const {user, error } = await supabase.auth.signInWithOtp({
          email: username,
          options: {
            shouldCreateUser: false,
            emailRedirectTo: window.location.origin + '/scio',
          },
        });

        if (error) {
          setError(error.message);
          setSuccessMessage('');
          console.error('Error sending magic link: ', error.message);
          return;
        }
        setSuccessMessage('A Magic Link has been sent to your email');
        setError('');
      } catch (error) {
        setSuccessMessage('');
        setError(error.message);
        console.error('Error sending magic link:', error.message);
      }
    }
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        signInWithEmail();
      }
    };
  
    return (
      <Container>
        <Content>
          <Title>Password Recovery</Title>
          {error && <Alert severity='error'>{error}</Alert>}
          {successMessage && <Alert severity='success'>{successMessage}</Alert>}
          <Input 
            style={{marginTop: '20px'}}
            label="Email" 
            variant="standard" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <ColorButton onClick={signInWithEmail}>Continue</ColorButton>
          <Typography style={{marginTop: '30px', color: grey[500]}}>      
            Already have an account? <LinkStyled to='/scio/' style={{color: 'white'}}>Login</LinkStyled>
        </Typography>
        </Content>
      </Container>
    );
};

export default ForgotPasswordPage;
