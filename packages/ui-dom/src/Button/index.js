import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as button from '@emcasa/ui/lib/components/Button'
import Group from '@emcasa/ui/lib/components/Group'

import Row from '../Row'

const Button = styled.button`
  outline: none;
  ${(props) => props.fluid && 'display: block'};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  ${button.container};
  ${button.text};
  -webkit-font-smoothing: antialiased;
  border-style: solid;
`

Button.defaultProps = {
  ...button.container.defaultProps,
  ...button.text.defaultProps
}

Button.propTypes = {
  ...button.container.propTypes,
  ...button.text.propTypes,
  children: PropTypes.node,
  onClick: PropTypes.func
}

Button.displayName = 'Button'

Button.Group = Group(({onSelect, selected, disabled}) => ({
  disabled,
  onClick: onSelect,
  selected
}))(Row)

export default Button
