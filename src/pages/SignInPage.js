import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../components/supabase';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/system';
import { Typography, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';

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
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 60px;
  color: ${grey[300]};
`;

const ErrorMessage = styled.div`
  color: red;
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
  color: ${grey[300]};
  text-decoration: none;
  font-size: 14px;
`;

const SignInPage = ({ setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) {
        setError('Invalid email or password');
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
        setError('Error sending reset email');
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
          label="Email" 
          variant="standard" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ColorButton onClick={handleSignIn} variant="contained">Sign In</ColorButton>
        <Typography style={{marginTop: '30px'}}>
          Don't have an account? <LinkStyled to="/scio/signup">Sign Up</LinkStyled>
        </Typography>
        <Typography>
          <LinkStyled to="/scio/forgot-password" onClick={handleForgotPassword}>
            Forgot password?
          </LinkStyled>
        </Typography>
      </Content>
    </Container>
  );
};

export default SignInPage;
