import {themeGet, fontSize, color} from 'styled-system'

import {letterSpacing, buttonHeight} from '../measures'
import {LETTER_SPACING, FONT_SIZE} from '@emcasa/ui'

export const container = `
  padding: 0 20px 0 20px;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({active, disabled, theme: {colors}}) =>
    active && !disabled ? colors.pink : colors.lightGrey};
  background-color: ${({active, disabled, theme: {colors}}) =>
    active && !disabled ? colors.pink : colors.white};
  height: ${themeGet('buttonHeight.0')};
  ${buttonHeight}
`

export const text = `
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
  fontSize: FONT_SIZE.default,
  letterSpacing: LETTER_SPACING.default
}
