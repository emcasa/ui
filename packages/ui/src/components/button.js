import {fontSize, color} from 'styled-system'

import {styleSheet} from '../utils'
import {letterSpacing, buttonHeight} from '../styles'

export const container = styleSheet`
  padding: 0 20px 0 20px;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({active, disabled, theme: {colors}}) =>
    active && !disabled ? colors.pink : colors.lightGrey};
  background-color: ${({active, disabled, theme: {colors}}) =>
    active && !disabled ? colors.pink : colors.white};
  ${buttonHeight}
`

container.defaultProps = {
  height: 'medium'
}

export const text = styleSheet`
  color: ${({active, disabled, theme: {colors}}) => {
    if (disabled) return colors.disabled
    else if (active) return colors.white
    else return colors.dark
  }};
  ${letterSpacing}
  ${fontSize}
  ${color}
`

text.defaultProps = {
  fontSize: 'default',
  letterSpacing: 'default'
}
