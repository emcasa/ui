import {css} from 'styled-components'
import {themeGet, color, border, borderColor, fontFamily} from 'styled-system'

import {letterSpacing, buttonHeight, fontSize} from '../../styles'

export const container = css`
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

container.propTypes = {
  ...letterSpacing.propTypes,
  ...buttonHeight.propTypes,
  ...border.propTypes,
  ...borderColor.propTypes
}

container.defaultProps = {
  letterSpacing: 'default',
  height: 'tall'
}

export const text = css`
  color: ${({disabled, theme: {colors}}) =>
    disabled ? colors.disabled : colors.dark};
  ${color};
  ${fontSize};
  ${letterSpacing};
  ${fontFamily};
`

text.propTypes = {
  ...color.propTypes,
  ...fontSize.propTypes,
  ...letterSpacing.propTypes,
  ...fontFamily.propTypes
}

text.defaultProps = {
  fontFamily: 'FaktSoftPro-Normal',
  fontSize: 'default',
  letterSpacing: 'default'
}

export const placeholder = css`
  color: ${themeGet('colors.disabled')};
`

placeholder.propTypes = {}
