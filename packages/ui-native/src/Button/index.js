import React from 'react'
import styled from 'styled-components/native'
import * as button from '@emcasa/ui/lib/components/Button'
import Group from '@emcasa/ui/lib/components/Group'

import View from '../View'
import {safe} from '../utils'

export const ButtonView = styled(safe.TouchableOpacity)`
  ${button.container};
`

export const ButtonText = styled(safe.Text)`
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

Button.Group = Group(({onSelect, selected, disabled}, node) => ({
  disabled,
  onPress: () => onSelect(node.props.value),
  active: selected
}))(View)
