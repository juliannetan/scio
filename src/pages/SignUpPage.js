import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../components/supabase';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { styled as muiStyled } from '@mui/system';
import { Typography, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

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
// const Input = styled.input`
//   background: none;
//   width: 100%;
//   padding: 12px;
//   border: none;
//   margin-bottom: 20px;
//   border-bottom: 2px solid #ccc;
//   font-size: 16px;
//   color: white;
// `;

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

const VisibilityIcon = muiStyled(Visibility)({
  color: grey[300],
});

const VisibilityOffIcon = muiStyled(VisibilityOff)({
  color: grey[300],
});

// const Button = styled.button`
//   background: grey;
//   width: 425px;
//   margin-bottom: 20px;
//   color: white;
//   padding: 12px;
//   border: none;
//   border-radius: 5px;
//   font-size: 16px;
//   cursor: pointer;
//   opacity: .5;
// `;


const SuccessMessage = styled.div`
  color: white;
  margin-bottom: 10px;
`;

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
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
      });

      if (error) {
        setError(error.message);
        setSuccessMessage('');
        console.error('Error signing up:', error.message);
        return;
      }

      setSuccessMessage('Check your email to confirm sign-up');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccessMessage('');
      console.error('Error signing up:', error.message);
    }
  };


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSignUp();
    }
  };

  return (
    <Container>
      <Content>
        <Title>Sign Up</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <Input
          variant="standard" 
          label="Full Name" 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          variant="standard" 
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          variant="standard" 
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Input
          type={showPassword ? 'text' : 'password'}
          variant="standard" 
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton tabIndex="-1" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          variant="standard" 
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton tabIndex="-1" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ColorButton onClick={handleSignUp}>Sign Up</ColorButton>
        <Typography style={{marginTop: '30px'}}>      
            Already have an account? <Link to='/scio/' style={{color: grey[300]}}>Login</Link>
        </Typography>
      </Content>
    </Container>
  );
};

export default SignUpPage;
