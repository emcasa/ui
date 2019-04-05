import * as styles from 'styled-system'

import {enumeratedStyle, enumerated} from '../utils'
import {
  LETTER_SPACING,
  BUTTON_HEIGHT,
  FONT_SIZE,
  FONT_WEIGHT,
  ICON_SIZE
} from '../theme/measures'

const transformUnit = (unit) => (n) => (isNaN(n) ? n : `${n}${unit}`)

export const letterSpacing = enumeratedStyle({
  map: LETTER_SPACING,
  prop: 'letterSpacing',
  cssProperty: 'letterSpacing',
  key: 'letterSpacing',
  transformValue: transformUnit('px')
})

export const buttonHeight = enumeratedStyle({
  map: BUTTON_HEIGHT,
  prop: 'height',
  cssProperty: 'height',
  key: 'buttonHeight',
  transformValue: transformUnit('px')
})

export const iconSize = (config) =>
  enumeratedStyle({
    map: ICON_SIZE,
    prop: 'size',
    key: 'iconSize',
    transformValue: transformUnit('px'),
    ...config
  })

export const iconHeight = iconSize({cssProperty: 'height'})

export const iconWidth = iconSize({cssProperty: 'height'})

export const fontSize = enumerated(FONT_SIZE, 'fontSize')(styles.fontSize)

export const fontWeight = enumerated(FONT_WEIGHT, 'fontWeight')(
  styles.fontWeight
)

export const defaultFontFamily = ({theme: {fontFamily}}) =>
  fontFamily ? `font-family: ${fontFamily};` : null

export {default as elevation} from './elevation'
export {default as breakpoint} from './breakpoint'
