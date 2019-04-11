import React from 'react'
import {ThemeProvider, createGlobalStyle} from 'styled-components'
import EmCasaStyles from '@emcasa/ui-dom/src/global-styles'
import theme from '@emcasa/ui'

const DoczStyles = createGlobalStyle`
  * {
    font-family: 'Rubik';
    -webkit-font-smoothing: antialiased;
  }
`

/**
 * Docz Wrapper.
 */
const Wrapper = ({children}) => (
  <ThemeProvider theme={theme}>
    <>
      <DoczStyles />
      <EmCasaStyles />
      {children}
    </>
  </ThemeProvider>
)

export default Wrapper
