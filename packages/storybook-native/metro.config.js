const path = require('path')
const getWorkspaces = require('get-yarn-workspaces')

const projectRoot = path.resolve(__dirname, '../..')

const workspaces = getWorkspaces(__dirname)

module.exports = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [path.resolve(projectRoot)].concat(workspaces),
  resolver: {
    getResolverMainFields: ['main'],
    extraNodeModules: {
      'react-native': path.join(__dirname, 'node_modules/react-native'),
      'react-native-svg': path.join(__dirname, 'node_modules/react-native-svg')
    }
  }
}
