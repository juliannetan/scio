import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import AppBar from './components/AppBar';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { supabase } from './components/supabase';
import ProblemblockPage from './pages/ProblemblockPage';
import CurrentblockPage from './pages/CurrentblockPage';
import FutureblockPage from './pages/FutureblockPage';
import SolutionblockPage from './pages/SolutionblockPage';
import DecisionblockPage from './pages/DecisionblockPage';
import ImplementationblockPage from './pages/ImplementationblockPage';
import ValueblockPage from './pages/ValueblockPage';
import LessonsblockPage from './pages/LessonsblockPage';
import TitleblockPage from './pages/TitleBlockPage';

const AppContainer = styled.div`
  background-color: #F5F5F7;
  min-height: 100vh;
`

const App = () => {
  const [token, setToken] = useState(false)
  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  // useEffect(() => {
  //   if (sessionStorage.getItem('token')) {
  //     let data = JSON.parse(sessionStorage.getItem('token'))
  //     setToken(data)
  //   }
  // }, [])

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

  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const sessionToken = sessionStorage.getItem('token');
  //   if (sessionToken) {
  //     let data = JSON.parse(sessionToken);
  //     setToken(data);
  //   }
  // }, []);

  // const handleEmailPasswordSignIn = async (email, password) => {
  //   try {
  //     const { user, error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password,
  //     });

  //     if (error) {
  //       console.error('Error signing in:', error.message);
  //       return;
  //     }

  //     setToken(user);
  //     sessionStorage.setItem('token', JSON.stringify(user));
  //   } catch (error) {
  //     console.error('Error signing in:', error.message);
  //   }
  // };

  // const navigate = useNavigate(); // Move this inside the App component

  const handleMagicLinkSignIn = async (tokenData) => {
    setToken(tokenData);
    sessionStorage.setItem('token', JSON.stringify(tokenData));
    // navigate(`${window.location.origin}/scio`);
        return <Navigate to="/scio/home" />;

  };

  // const handleMagicLinkSignIn = async (tokenData) => {
  //   setToken(tokenData);
  //   sessionStorage.setItem('token', JSON.stringify(tokenData));
  //   return <Navigate to="/scio/home" />;
  // };

  

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
            {/* <Route
              path="/scio/"
              element={<SignIn setToken={handleMagicLinkSignIn} onEmailPasswordSignIn={handleEmailPasswordSignIn} />}
            /> */}
            {/* <Route path="/scio/signup" element={<SignUp />} />
            <Route
              path="/scio/home"
              element={token ? <AppBar token={token} onSignOut={handleSignOut} /> : <Navigate to="/scio/" />}
            />
            <Route path="/scio/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/scio/" element={<SignIn setToken={setToken} onMagicLinkSignIn={handleMagicLinkSignIn} />} /> */}
          <Route path="/scio/" element={<AppBar />} /> 
          <Route path="/scio/problem-statement" element={<ProblemblockPage />} /> 
          <Route path="/scio/current-state" element={<CurrentblockPage />} /> 
          <Route path="/scio/future-state" element={<FutureblockPage />} /> 
          <Route path="/scio/solution-evaluation" element={<SolutionblockPage />} /> 
          <Route path="/scio/decision" element={<DecisionblockPage />} /> 
          <Route path="/scio/implementation-plan" element={<ImplementationblockPage />} /> 
          <Route path="/scio/value-delivery" element={<ValueblockPage />} /> 
          <Route path="/scio/lessons-learned" element={<LessonsblockPage />} /> 
          <Route path="/scio/title-block" element={<TitleblockPage />} /> 
        {/* {token ? <Route path='/scio/MissionPage' element={<AppBar token={token} />} /> : 'NavigateToSignIn' } */}
          </Routes>
      </Router>
      </AppContainer>
    </ThemeProvider>
  )
}

export default App