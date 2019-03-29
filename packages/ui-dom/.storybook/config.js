import React from 'react'
import {injectGlobal, ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'

import {configure, addDecorator, setAddon} from '@storybook/react'
import addonInfo from '@storybook/addon-info'

injectGlobal`
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    src: local('Rubik'), local('Rubik-Regular'), url(https://fonts.gstatic.com/s/rubik/v8/iJWKBXyIfDnIV7nBrXyw023e.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    src: local('Rubik Medium'), local('Rubik-Medium'), url(https://fonts.gstatic.com/s/rubik/v8/iJWHBXyIfDnIV7Eyjmmd8WD07oB-.woff2) format('woff2');
  }

  * {
    font-family: 'Rubik';
    -webkit-font-smoothing: antialiased;
  }
`

addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)

setAddon(addonInfo)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
