import React from 'react'
import {
  ThemeProvider,
  createGlobalStyle
} from 'styled-components'
import GlobalStyle from '@emcasa/ui-dom/src/global-styles'
import theme from '@emcasa/ui'

const UIDocsStyle = createGlobalStyle`
  * {
    font-family: 'FaktSoftPro-Normal';
    -webkit-font-smoothing: antialiased;
  }
`

/**
 * Docz Wrapper.
 */
const Wrapper = ({children}) => (
  <ThemeProvider theme={theme}>
    <>
      <UIDocsStyle />
      <GlobalStyle />
      {children}
    </>
  </ThemeProvider>
)

export default Wrapper
