import {style} from 'styled-system'

const transformUnit = (unit) => (n) => (isNaN(n) ? n : `${n}${unit}`)

export const letterSpacing = style({
  prop: 'letterSpacing',
  cssProperty: 'letterSpacing',
  key: 'letterSpacing',
  transformValue: transformUnit('px')
})

export const buttonHeight = style({
  prop: 'height',
  cssProperty: 'height',
  key: 'buttonHeight',
  transformValue: transformUnit('px')
})

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
