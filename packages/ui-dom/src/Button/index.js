import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as button from '@emcasa/ui/lib/components/Button'

const Button = styled.button`
  ${(props) => props.fluid && 'display: block'};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  & :hover {
    background-color: ${({active, disabled, theme: {colors}}) =>
      active && !disabled ? colors.pink : colors.white};
  }
  ${button.container};
  ${button.text};
`

Button.defaultProps = {
  ...button.container.defaultProps,
  ...button.text.defaultProps
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default Button
