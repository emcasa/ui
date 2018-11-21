import React, {PureComponent} from 'react'
import styled from 'styled-components'
import {View, Input} from '@emcasa/ui-dom'
import throttle from 'lodash.throttle'

export default class SearchResults extends PureComponent {
  state = {
    search: '',
    results: []
  }

  updateResults = throttle(async () => {
    const {search, loading} = this.state
    if (search.length < 3 || loading) return
    this.setState({loading: true})
    const response = await fetch(
      `https://itunes.apple.com/search?limit=10&entity=album&term=${encodeURIComponent(
        search
      )}`
    )
    if (response.status === 200) {
      const {results} = await response.json()
      this.setState({results})
    }
    this.setState({loading: false})
  }, 300)

  onChange = (search) => this.setState({search}, this.updateResults)

  render() {
    return this.props.children({...this.state, onChange: this.onChange})
  }
}

SearchResults.Input = styled(({className, style, ...props}) => (
  <View className={className} style={style}>
    <Input
      hideLabelView
      hideErrorView
      {...props}
      height="55px"
      width="100%"
      style={{border: 'none'}}
    />
  </View>
))`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  height: 100%;
  width: 100%;
`
