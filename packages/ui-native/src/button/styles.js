import styled from 'styled-components/native'
import * as button from '@emcasa/ui/lib/components/button'

const Button = styled.TouchableOpacity`
  ${button.container};
`

Button.defaultProps = {
  ...button.container.defaultProps,
  alignItems: 'center',
  justifyContent: 'center'
}

export default Button

export const ButtonText = styled.Text`
  ${button.text};
`

ButtonText.defaultProps = {
  ...button.text.defaultProps
}
