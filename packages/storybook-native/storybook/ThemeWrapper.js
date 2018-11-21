import React, {PureComponent, Fragment} from 'react'
import {StatusBar} from 'react-native'
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
      <ThemeProvider theme={this.state}>
        <Fragment>
          <StatusBar translucent hidden />
          {this.props.children}
        </Fragment>
      </ThemeProvider>
    )
  }
}
