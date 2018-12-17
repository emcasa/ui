import React, {PureComponent} from 'react'
import {View, TextInput as RCTTextInput} from 'react-native'
import styled, {withTheme} from 'styled-components/native'
import {themeGet} from 'styled-system'
import * as input from '@emcasa/ui/lib/components/Input'

import omitProps, {layoutProps, textStyleProps} from '../utils/omitProps'

const TextInput = styled(
  omitProps(...layoutProps, ...textStyleProps)(RCTTextInput)
)`
  ${input.container};
  ${input.text};
  text-align-vertical: ${({area}) => (area ? 'top' : 'center')};
`

const ErrorText = styled.Text`
  min-height: ${themeGet('space.5')}px;
  line-height: ${themeGet('space.5')}px;
  ${input.error};
`

const LabelText = styled.Text`
  min-height: ${themeGet('space.4')}px;
  line-height: ${themeGet('space.4')}px;
  font-size: ${themeGet('fontSizes.1')}px;
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
    const {
      theme,
      hideErrorView,
      hideLabelView,
      error,
      label,
      ...props
    } = this.props
    return (
      <View mb="2.5px">
        {!hideLabelView && <LabelText>{label}</LabelText>}
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
        {!hideErrorView && <ErrorText>{error}</ErrorText>}
      </View>
    )
  }
}

export default withTheme(Input)
