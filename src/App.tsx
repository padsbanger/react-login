import React from 'react'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import { Typography } from '@material-ui/core'
import { StylesProvider } from '@material-ui/core/styles'

import LoginFrom from './components/LoginForm'

function App() {
  return (
    <StylesProvider injectFirst>
      <CenterContainer>
        <Typography variant="h2">Login</Typography>
        <LoginFrom />
      </CenterContainer>
    </StylesProvider>
  )
}

const CenterContainer = styled(Container)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default App
