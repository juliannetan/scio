// src/App.js
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import AppBar from './components/AppBar'
import theme from './theme'

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.white};
  min-height: 100vh;
  display: flex;
`

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <AppBar />
      </AppContainer>
    </ThemeProvider>
  )
}

export default App