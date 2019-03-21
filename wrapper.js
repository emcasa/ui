import React from 'react'
import {
  ThemeProvider,
  injectGlobal as styledInjectGlobal
} from 'styled-components'
import injectGlobal from '@emcasa/ui-dom/src/global-styles'
import theme from '@emcasa/ui'

styledInjectGlobal`
  * {
    font-family: 'Rubik';
    -webkit-font-smoothing: antialiased;
  }
`

/**
 * Docz Wrapper.
 */
const Wrapper = ({children}) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Wrapper
