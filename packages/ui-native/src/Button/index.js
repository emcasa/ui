import React from 'react'
import pick from 'lodash.pick'
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

const textProps = Object.keys(button.text.propTypes)

export default function Button({children, ...props}) {
  return (
    <ButtonView {...props}>
      <ButtonText {...pick(props, textProps)}>{children}</ButtonText>
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
