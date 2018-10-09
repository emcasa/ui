import React from 'react'
import { ThemeProvider } from 'styled-components'
import injectGlobal from '@emcasa/ui-dom/src/global-styles'
import theme from '@emcasa/ui'

/**
 * Docz Wrapper.
 */
const Wrapper = ({children}) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Wrapper
