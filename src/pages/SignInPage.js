import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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


const SignInPage = ({ setToken }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: username,
          password: password,
        });
  
        if (error) {
          setError('Invalid email or password.');
          return;
        }
  
        console.log(data);
        setToken(data);
        navigate('/scio/home');
      } catch (error) {
        console.error('Error signing in:', error.message);
      }
    };

    const handleForgotPassword = async () => {
      try {
        const { error } = await supabase.auth.api.resetPasswordForEmail(username);
  
        if (error) {
          setError('Error sending reset email.');
          console.error('Error sending reset email:', error.message);
        } else {
          setError('Reset email sent. Check your inbox.');
        }
      } catch (error) {
        console.error('Error sending reset email:', error.message);
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSignIn();
      }
    };
  
    return (
      <Container>
        <Content>
          <Title>Sign In</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleSignIn}>Sign In</Button>
          <Typography>
            Don't have an account? <LinkStyled to='/scio/signup'>Sign Up</LinkStyled>
          </Typography>
          <Typography>
            <LinkStyled to="/scio/forgot-password" onClick={handleForgotPassword}>Forgot password?</LinkStyled>
          </Typography>
        </Content>
      </Container>
    );
};

export default SignInPage;
