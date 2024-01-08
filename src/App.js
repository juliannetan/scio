// src/App.js
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import PersistentDrawerLeft from './components/PersistentDrawerLeft'
import theme from './theme'

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.white};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <PersistentDrawerLeft />
      </AppContainer>
    </ThemeProvider>
  )
}

export default App