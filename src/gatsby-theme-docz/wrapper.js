import React from 'react'
import {ThemeProvider, createGlobalStyle} from 'styled-components'
import EmCasaStyles from '@emcasa/ui-dom/src/global-styles'
import {fas} from '@fortawesome/free-solid-svg-icons'

import theme from '@emcasa/ui'

const iconedTheme = {
  ...theme,
  icons: {default: fas}
}

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
  <ThemeProvider theme={iconedTheme}>
    <>
      <DoczStyles />
      <EmCasaStyles />
      {children}
    </>
  </ThemeProvider>
)

export default Wrapper
