import React, {PureComponent} from 'react'
import {ThemeProvider} from 'styled-components'
import theme from './index'

export default class ImageUploadThemeProvider extends PureComponent {
  static defaultProps = {theme}

  state = {
    ImageUpload: {...theme, ...this.props.theme}
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme)
      this.setState({
        theme: {ImageUpload: {...theme, ...this.props.theme}}
      })
  }

  render() {
    return (
      <ThemeProvider theme={this.state}>{this.props.children}</ThemeProvider>
    )
  }
}
