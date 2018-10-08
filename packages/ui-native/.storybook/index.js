import {AppRegistry} from 'react-native'
import {getStorybookUI, configure} from '@storybook/react-native'
import './addons'

const StorybookUI = getStorybookUI({
  port: 7007,
  host: 'localhost'
})

AppRegistry.registerComponent('EmCasa', () => StorybookUI)

const req = require.context('../src', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
