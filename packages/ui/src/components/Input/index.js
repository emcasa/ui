import {css} from 'styled-components'
import {themeGet, color, border, borderColor, fontFamily} from 'styled-system'

import {
  letterSpacing,
  buttonHeight,
  fontSize,
  defaultFontFamily
} from '../../styles'

export const container = css`
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({active, disabled, focus, theme: {colors}}) => {
    if (focus) return colors.blue
    else if (active && !disabled) return colors.pink
    else return colors.lightGrey
  }};
  padding: ${({area, theme: {space}}) =>
    area
      ? `${space[2]}px ${space[2]}px ${space[2]}px ${space[2]}px`
      : `${space[0]}px ${space[2]}px ${space[0]}px ${space[2]}px`};
  ${buttonHeight};
  ${border};
  ${borderColor};
`

container.propTypes = {
  ...buttonHeight.propTypes,
  ...border.propTypes,
  ...borderColor.propTypes
}

container.defaultProps = {
  letterSpacing: 'default',
  height: 'tall',
  fluid: true
}

export const text = css`
  color: ${({disabled, theme: {colors}}) =>
    disabled ? colors.disabled : colors.dark};
  ${defaultFontFamily};
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
  fontSize: 'default',
  letterSpacing: 'default'
}

export const error = css`
  display: inline;
  color: ${themeGet('colors.red')};
  ${defaultFontFamily};
  ${fontSize};
  ${letterSpacing};
`

error.propTypes = {
  ...fontSize.propTypes,
  ...letterSpacing.propTypes
}

error.defaultProps = {
  fontSize: 'small',
  letterSpacing: 'default'
}

export const placeholder = css`
  color: ${themeGet('colors.disabled')};
`

placeholder.propTypes = {}
