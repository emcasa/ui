import styled from 'styled-components'
import {
  fontSize,
  color,
  space,
  letterSpacing,
  borderColor,
  background,
  height
} from 'styled-system'

let Button = styled.button`
  ${color}
  ${fontSize}
  ${borderColor}
  ${background}
  ${letterSpacing}
  ${height}
  ${space}

  border-radius: 4px;
  border: 1px solid;

  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`

export default Button
