import {configure, setAddon} from '@storybook/react'
import addonInfo from '@storybook/addon-info'

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)

setAddon(addonInfo)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
