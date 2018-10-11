import React, {PureComponent} from 'react'
import {Font} from 'expo'
import {ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'

export default class ThemeWrapper extends PureComponent {
  state = {
    ...theme,
    fontFamily: null
  }

  async componentDidMount() {
    await Font.loadAsync({
      FaktSoftPro: require('../assets/FaktSoftPro-Normal.ttf')
    })
    this.setState({fontFamily: 'FaktSoftPro'})
  }

  render() {
    return (
      <ThemeProvider theme={this.state}>{this.props.children}</ThemeProvider>
    )
  }
}
