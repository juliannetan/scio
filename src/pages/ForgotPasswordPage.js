import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../components/supabase';
import styled from 'styled-components';
import { Typography} from '@mui/material';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(scio_logo2017_dark-blue.png);
  background-color: #004F71;
  background-size: 800px 800px;
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

const Input = styled.input`
  background: none;
  width: 100%;
  padding: 12px;
  border: none;
  margin-bottom: 20px;
  border-bottom: 2px solid #ccc;
  font-size: 16px;
  color: white;
`;

const Button = styled.button`
  background: grey;
  width: 425px;
  margin-bottom: 20px;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  opacity: .5;
`;

const LinkStyled = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 14px;
`;


const ForgotPasswordPage = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function signInWithEmail() {
      try {
        if (!username) {
          setError('Please enter your email.');
          setSuccessMessage('');
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
          setError('Please enter a valid email address.');
          setSuccessMessage('');
          return;
        }
    
        await supabase.auth.signInWithOtp({
          email: username,
          options: {
            shouldCreateUser: false,
            emailRedirectTo: window.location.origin + '/scio/home',
          },
        });
        setSuccessMessage('A Magic Link has been sent to your email.');
        setError('');
      } catch (error) {
        setSuccessMessage('');
        setError('Error sending magic link. Please check your email and try again.');
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
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          <Input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={signInWithEmail}>Continue</Button>
          <Typography>      
            Already have an account? <LinkStyled to='/scio/' style={{color: 'white'}}>Login</LinkStyled>
        </Typography>
        </Content>
      </Container>
    );
};

export default ForgotPasswordPage;
