const path = require('path')
const getConfig = require('metro-bundler-config-yarn-workspaces')

const nodeModules = path.resolve(__dirname, '../../')

const config = getConfig(__dirname, {nodeModules})

config.extraNodeModules['@storybook'] = path.join(nodeModules, '@storybook')

module.exports = config
