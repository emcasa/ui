import {
  fontSize,
  color,
  flex,
  flexDirection,
  alignItems,
  justifyContent
} from 'styled-system'
import {css} from 'styled-components'

import {letterSpacing, buttonHeight} from '../styles'

export const container = css`
  padding: 0 20px 0 20px;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({active, disabled, theme: {colors}}) =>
    active && !disabled ? colors.pink : colors.lightGrey};
  background-color: ${({active, disabled, theme: {colors}}) =>
    active && !disabled ? colors.pink : colors.white};
  ${buttonHeight}
  ${flex}
  ${flexDirection}
  ${alignItems}
  ${justifyContent}
`

container.defaultProps = {
  height: 'medium'
}

export const text = css`
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
