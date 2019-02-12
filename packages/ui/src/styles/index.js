import * as styles from 'styled-system'

import {enumeratedStyle, enumerated} from '../utils'
import {
  LETTER_SPACING,
  BUTTON_HEIGHT,
  FONT_SIZE,
  ICON_SIZE
} from '../theme/measures'

const transformUnit = (unit) => (n) => (isNaN(n) ? n : `${n}${unit}`)

export const letterSpacing = enumeratedStyle({
  enum: Array.from(LETTER_SPACING.keys()),
  prop: 'letterSpacing',
  cssProperty: 'letterSpacing',
  key: 'letterSpacing',
  transformValue: transformUnit('px')
})

export const buttonHeight = enumeratedStyle({
  enum: Array.from(BUTTON_HEIGHT.keys()),
  prop: 'height',
  cssProperty: 'height',
  key: 'buttonHeight',
  transformValue: transformUnit('px')
})

export const iconSize = enumeratedStyle({
  enum: Array.from(ICON_SIZE.keys()),
  prop: 'size',
  cssProperty: 'width',
  key: 'iconSize',
  transformValue: transformUnit('px')
})

export const fontSize = enumerated(Array.from(FONT_SIZE.keys()), 'fontSize')(
  styles.fontSize
)

export const defaultFontFamily = ({theme: {fontFamily}}) =>
  fontFamily ? `font-family: ${fontFamily};` : null

export {default as elevation} from './elevation'
export {default as breakpoint} from './breakpoint'
