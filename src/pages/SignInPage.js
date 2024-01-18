// components/SignIn.js
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
  background-size: 57vw 57vw;
  background-position: center;
  background-repeat: no-repeat;
`;

const Content = styled.div`
  text-align: center;
  max-width: 400px; /* Adjust the width as needed */
  width: 100%;
`;

// const Logo = styled.img`
//   width: 80px;
//   margin-bottom: 20px;
  
// `;

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
  margin-top: 10px;
  display: block;
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
        navigate('/scio/MissionPage');
      } catch (error) {
        console.error('Error signing in:', error.message);
      }
    };
  
    return (
      <Container>
        <Content>
          {/* <Logo src="/scio/scio_logo2017_clear-gray.png" alt="SCIO Logo" /> */}
          <Title>Sign In</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSignIn}>Sign In</Button>
          <Typography>
          Don't have an account? <LinkStyled to='/scio/signup'>Sign Up</LinkStyled>
          </Typography>
          <LinkStyled to="/forgot-password">Forgot Password?</LinkStyled>
        </Content>
      </Container>
    );
};

export default SignInPage;
