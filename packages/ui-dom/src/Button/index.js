import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as button from '@emcasa/ui/lib/components/Button'

const Button = styled.button`
  ${button.container}
  ${button.text}
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`

Button.defaultProps = {
  ...button.container.defaultProps,
  ...button.text.defaultProps
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

Button.displayName = 'Button'
export default Button
