import React, {PureComponent} from 'react'
import {ThemeProvider} from 'styled-components'
import theme from './index'

export default class ImageUploadThemeProvider extends PureComponent {
  state = {
    ...theme
  }

  get theme() {
    return {
      ImageUpload: {
        ...this.state,
        update: this.setState
      }
    }
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>{this.props.children}</ThemeProvider>
    )
  }
}
