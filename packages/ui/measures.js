import {enumeratedStyle} from './utils'
import {LETTER_SPACING, BUTTON_HEIGHT} from './index'

const transformUnit = (unit) => (n) => (isNaN(n) ? n : `${n}${unit}`)

export const letterSpacing = enumeratedStyle({
  enum: LETTER_SPACING,
  prop: 'letterSpacing',
  cssProperty: 'letterSpacing',
  key: 'letterSpacing',
  transformValue: transformUnit('px')
})

export const buttonHeight = enumeratedStyle({
  enum: BUTTON_HEIGHT,
  prop: 'height',
  cssProperty: 'height',
  key: 'buttonHeight',
  transformValue: transformUnit('px')
})

// TODO - remote this
const MEASURES = {
  letterSpacing: {
    default: '0.56px'
  },
  font: {
    default: '18px',
    small: '14px'
  },
  buttonHeight: {
    tall: '60px',
    medium: '40px'
  },
  spacing: {
    large: '20px',
    normal: '14px',
    short: '10px'
  }
}

export default MEASURES
