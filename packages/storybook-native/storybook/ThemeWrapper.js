import React, {PureComponent} from 'react'
import {ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'

export default class ThemeWrapper extends PureComponent {
  render() {
    return <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>
  }
}
