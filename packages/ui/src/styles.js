import * as styles from 'styled-system'

import {enumeratedStyle, enumerated} from './utils'
import {LETTER_SPACING, BUTTON_HEIGHT, FONT_SIZE} from './theme/measures'

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

export const fontSize = enumerated(FONT_SIZE, 'fontSize')(styles.fontSize)
