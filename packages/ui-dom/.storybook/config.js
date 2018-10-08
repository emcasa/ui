import React from 'react'
import {injectGlobal, ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'

import {configure, addDecorator, setAddon} from '@storybook/react'
import addonInfo from '@storybook/addon-info'

injectGlobal`
  @font-face {
    font-family: "FaktSoftPro-Normal";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.woff") format('woff'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.woff2") format('woff2'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Normal.ttf") format('ttf');
  }

  @font-face {
    font-family: "FaktSoftPro-Medium";
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.eot");
    src: url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.woff") format('woff'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.woff2") format('woff2'),
        url("https://s3.amazonaws.com/emcasa-ui/fonts/FaktSoftPro-Medium.ttf") format('ttf');
  }

  * {
    font-family: 'FaktSoftPro-Normal';
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
