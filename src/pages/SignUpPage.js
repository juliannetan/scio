// components/SignUp.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../components/supabase';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

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
  width: 27.5vw;
  margin-bottom: 20px;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  opacity: .5;
`;


const SignUpPage = () => {
  const history = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            }
        }
      });

      if (error) {
        setError(error.message);
        console.error('Error signing up:', error.message);
        return;
      }

      console.log('User:', user);
      history.push('/home');
    } catch (error) {
      setError(error.message);
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <Container>
      <Content>
        {/* <Logo src="/scio/metal_logo.png" alt="SCIO Logo" /> */}
        <Title>Sign Up</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignUp}>Sign Up</Button>
        <Typography>      
            Already have an account? <Link to='/scio/'>Login</Link>
        </Typography>
      </Content>
    </Container>
  );
};

export default SignUpPage;
