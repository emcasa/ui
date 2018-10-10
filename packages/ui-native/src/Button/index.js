import React from 'react'
import styled from 'styled-components/native'
import * as button from '@emcasa/ui/lib/components/Button'

export const ButtonView = styled.TouchableOpacity`
  ${button.container};
`

export const ButtonText = styled.Text`
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
