const path = require('path')
const getConfig = require('metro-bundler-config-yarn-workspaces')

const nodeModules = path.resolve(__dirname, '../../')

const config = getConfig(__dirname, {nodeModules})

Object.assign(config.extraNodeModules, {
  '@storybook': path.join(nodeModules, '@storybook'),
  'react-native': path.join(__dirname, 'node_modules/react-native'),
  'react-native-svg': path.join(__dirname, 'node_modules/react-native-svg')
})

module.exports = config
