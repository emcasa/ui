import webpack from 'webpack'

export default {
  title: 'EmCasa UI',
  base: '/',
  hashRouter: true,
  wrapper: 'wrapper.js',
  files: './docs/**/*.mdx',
  themeConfig: {
    logo: {
      src: 'https://s3.amazonaws.com/emcasa-ui/logo/symbol.svg',
      width: 50,
      height: 50
    },
    colors: {
      primary: '#F50057',
      text: '#3c4858',
      sidebarBg: '#e0e6ed',
      link: '#1fb6ff'
    }
  },
  modifyBundlerConfig(config) {
    config.plugins.unshift(
      new webpack.EnvironmentPlugin({
        GOOGLE_MAPS_API_KEY: ''
      })
    )
    return config
  }
}
