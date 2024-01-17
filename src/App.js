// src/App.js
import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import AppBar from './components/AppBar';

const AppContainer = styled.div`
  background-color: #F5F5F7;
  min-height: 100vh;
`

const App = () => {

  const [token, setToken] = useState(false)
  const NavigateToSignIn = <Route path="/scio/" element={<SignIn setToken={setToken} />} />
  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
      <Router>
        <Routes>
          <Route path="/scio/signup" element={<SignUp />} />
          <Route path="/scio/" element={<SignIn setToken={setToken} />} />
          {/* <Route path="/scio/home" element={<AppBar token={token} />} />  */}
        {token ? <Route path='/scio/MissionPage' element={<AppBar token={token} />} /> : 'NavigateToSignIn' }
        </Routes>
      </Router>
      </AppContainer>
    </ThemeProvider>
  )
}

export default App