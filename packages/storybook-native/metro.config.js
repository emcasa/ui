const path = require('path')
const getWorkspaces = require('get-yarn-workspaces')
const blacklist = require('metro-config/src/defaults/blacklist')

const projectRoot = path.resolve(__dirname, '../..')

const packageDir = path.basename(__dirname)

const workspaces = getWorkspaces(__dirname)

module.exports = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [path.resolve(projectRoot)].concat(workspaces),
  resolver: {
    getResolverMainFields: ['main'],
    blacklistRE: blacklist(
      [
        `packages\\/(?!${packageDir}).*\\/node_modules\\/(.*\\/)?react-native\\/.*`
      ].map((pattern) => new RegExp(pattern))
    ),
    extraNodeModules: {
      'react-native': path.join(__dirname, 'node_modules/react-native'),
      'react-native-svg': path.join(__dirname, 'node_modules/react-native-svg')
    }
  }
}
