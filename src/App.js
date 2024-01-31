import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import AppBar from './components/AppBar';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { supabase } from './components/supabase';

const AppContainer = styled.div`
  background-color: #F5F5F7;
  min-height: 100vh;
`

const App = () => {
  const [token, setToken] = useState(false)
  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const magicLinkToken = urlParams.get('token');

    if (magicLinkToken) {
      handleMagicLinkSignIn({ token: magicLinkToken });
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        setToken(JSON.parse(storedToken));
      }
    }
  }, []);


  const handleMagicLinkSignIn = async (tokenData) => {
    setToken(tokenData);
    sessionStorage.setItem('token', JSON.stringify(tokenData));
        return <Navigate to="/scio/home" />;

  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setToken(null);
    sessionStorage.removeItem('token');
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
      <Router>
          <Routes>
            <Route path="/scio/signup" element={<SignUp />} />
            <Route
              path="/scio/home"
              element={token ? <AppBar token={token} onSignOut={handleSignOut} /> : <Navigate to="/scio/" />}
            />
            <Route path="/scio/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/scio/" element={<SignIn setToken={setToken} onMagicLinkSignIn={handleMagicLinkSignIn} />} />
          {/* <Route path="/scio/home" element={<AppBar token={token} />} />  */}
        {/* {token ? <Route path='/scio/MissionPage' element={<AppBar token={token} />} /> : 'NavigateToSignIn' } */}
          </Routes>
      </Router>
      </AppContainer>
    </ThemeProvider>
  )
}

export default App