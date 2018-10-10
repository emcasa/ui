import {css} from 'styled-components'
import {
  themeGet,
  color,
  border,
  borderColor,
  fontFamily
} from 'styled-system'

import {letterSpacing, buttonHeight, fontSize} from '../../styles'

export const container = css`
  outline: none;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({active, disabled, focus, theme: {colors}}) => {
    if (focus) return colors.blue
    else if (active && !disabled) return colors.pink
    else return colors.lightGrey
  }};
  padding: ${(props) => {
    const {area, theme: {space}} = props
    return (
      area ? css`${space[2]}px ${space[2]}px ${space[2]}px ${space[2]}px`
           : css`${space[0]}px ${space[2]}px ${space[0]}px ${space[2]}px`)
  }}
  ${letterSpacing}
  ${buttonHeight}
  ${border}
  ${borderColor}
`

container.defaultProps = {
  letterSpacing: 'default',
  height: 'tall'
}

export const text = css`
  color: ${({disabled, theme: {colors}}) =>
    disabled ? colors.disabled : colors.dark};
  ${color};
  ${fontSize};
  ${letterSpacing}
  ${fontFamily}
`

text.defaultProps = {
  fontFamily: 'FaktSoftPro-Normal',
  fontSize: 'default',
  letterSpacing: 'default'
}

export const placeholder = css`
  color: ${themeGet('colors.disabled')};
`
