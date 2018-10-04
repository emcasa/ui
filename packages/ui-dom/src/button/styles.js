import styled from 'styled-components'
import * as button from '@emcasa/ui/components/button'

const Button = styled.button`
  ${button.container}
  ${button.text}
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`

Button.defaultProps = {
  ...button.container.defaultProps,
  ...button.text.defaultProps
}

export default Button
