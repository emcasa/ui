import React, {PureComponent} from 'react'
import {View} from 'react-native'
import styled, {withTheme} from 'styled-components/native'
import * as input from '@emcasa/ui/lib/components/Input'

import {safe} from '../utils'
import Text from '../Text'

const TextInput = styled(safe.TextInput)`
  ${input.container};
  ${input.text};
  text-align-vertical: ${({area}) => (area ? 'top' : 'center')};
`

class Input extends PureComponent {
  static propTypes = {
    ...input.container.propTypes,
    ...input.text.propTypes
  }

  static defaultProps = {
    ...input.container.defaultProps,
    ...input.text.defaultProps
  }

  state = {focus: false}

  onFocus = () => this.setState({focus: true}, this.props.onFocus)

  onBlur = () => this.setState({focus: false}, this.props.onBlur)

  render() {
    const {theme, ...props} = this.props
    return (
      <View>
        {props.label && <Text fontSize="small">{props.label}</Text>}
        <TextInput
          placeholderTextColor={theme.colors.disabled}
          multiline={props.area}
          underlineColorAndroid="rgba(0,0,0,0)"
          selectionColor="rgba(31, 182, 255, 0.3)"
          {...props}
          {...this.state}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </View>
    )
  }
}

export default withTheme(Input)
