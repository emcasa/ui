import {themeGet, color, border, borderColor} from 'styled-system'

import {styleSheet} from '../utils'
import {letterSpacing, buttonHeight} from '../styles'

export const container = styleSheet`
  outline: none;
  padding: 0 14px 0 14px;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({active, disabled, focus, theme: {colors}}) => {
    if (focus) return colors.blue
    else if (active && !disabled) return colors.pink
    else return colors.lightGrey
  }};
  ${letterSpacing}
  ${buttonHeight}
  ${border}
  ${borderColor}
`

container.defaultProps = {
  letterSpacing: 'default',
  height: 'tall'
}

export const text = styleSheet`
  color: ${({disabled, theme: {colors}}) =>
    disabled ? colors.disabled : colors.dark};
  ${color}
`

export const placeholder = styleSheet`
  color: ${themeGet('colors.disabled')}
`
