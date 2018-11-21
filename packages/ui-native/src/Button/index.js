import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import * as button from '@emcasa/ui/lib/components/Button'
import Group from '@emcasa/ui/lib/components/Group'

import View from '../View'
import {omitLayoutProps, omitTextStyleProps} from '../utils/omitProps'

export const ButtonView = styled(omitLayoutProps(TouchableOpacity))`
  ${button.container};
`

export const ButtonText = styled(omitTextStyleProps(Text))`
  ${button.text};
`

export default function Button({children, ...props}) {
  return (
    <ButtonView {...props}>
      <ButtonText {...props}>{children}</ButtonText>
    </ButtonView>
  )
}

Button.propTypes = {
  ...button.container.propTypes,
  ...button.text.propTypes
}

Button.defaultProps = {
  ...button.container.defaultProps,
  ...button.text.defaultProps,
  alignItems: 'center',
  justifyContent: 'center'
}

Button.Group = Group(({onSelect, selected, disabled}) => ({
  disabled,
  onPress: onSelect,
  active: selected
}))(View)
