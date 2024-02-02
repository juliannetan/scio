import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import AppBar from './components/AppBar';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { supabase } from './components/supabase';
import GlanceA3Canvas from './pages/GlanceA3Canvas';
import ProblemblockDisplay from './pages/ProblemblockDisplay';
import CurrentblockDisplay from './pages/CurrentblockDisplay';
import FutureblockDisplay from './pages/FutureblockDisplay';
import SolutionblockDisplay from './pages/SolutionblockDisplay';
import DecisionblockDisplay from './pages/DecisionblockDisplay';
import ImplementationblockDisplay from './pages/ImplementationblockDisplay';
import ValueblockDisplay from './pages/ValueblockDisplay';
import LessonsblockDisplay from './pages/LessonsblockDisplay';
import TitleblockDisplay from './pages/TitleblockDisplay';

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
          <Route path="/scio/home/problem-statement" element={<ProblemblockDisplay />} /> 
          <Route path="/scio/home/current-state" element={<CurrentblockDisplay />} /> 
          <Route path="/scio/home/future-state" element={<FutureblockDisplay />} /> 
          <Route path="/scio/home/solution-evaluation" element={<SolutionblockDisplay />} /> 
          <Route path="/scio/home/decision" element={<DecisionblockDisplay />} /> 
          <Route path="/scio/home/implementation-plan" element={<ImplementationblockDisplay />} /> 
          <Route path="/scio/home/value-delivery" element={<ValueblockDisplay />} /> 
          <Route path="/scio/home/lessons-learned" element={<LessonsblockDisplay />} /> 
          <Route path="/scio/home/title-block" element={<TitleblockDisplay />} /> 
          <Route path="/scio/a3-canvas" element={<GlanceA3Canvas />} /> 
          <Route path="/scio/" component={GlanceA3Canvas} />
          </Routes>
      </Router>
      </AppContainer>
    </ThemeProvider>
  )
}

export default App