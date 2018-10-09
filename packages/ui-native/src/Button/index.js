import React from 'react'
import pick from 'lodash.pick'
import styled from 'styled-components/native'
import * as button from '@emcasa/ui/lib/components/Button'

export const Button = styled.TouchableOpacity`
  ${button.container};
`

Button.propTypes = {
  ...button.container.propTypes
}

Button.defaultProps = {
  ...button.container.defaultProps,
  alignItems: 'center',
  justifyContent: 'center'
}

export const ButtonText = styled.Text`
  ${button.text};
`

ButtonText.defaultProps = {
  ...button.text.defaultProps
}

export default ({children, ...props}) => (
  <Button {...props}>
    <ButtonText {...pick(props, ['active', 'disabled'])}>{children}</ButtonText>
  </Button>
)
