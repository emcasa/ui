import {css} from 'styled-components'
import {themeGet} from '@styled-system/theme-get'
import {color, border, borderColor, fontFamily, space} from 'styled-system'

import {
  letterSpacing,
  buttonHeight,
  buttonFontSize,
  defaultFontFamily
} from '../../styles'

export const container = css`
  border-radius: ${themeGet('borderRadius.default')}px;
  border: 1px solid;
  border-color: ${({active, disabled, focus, error}) => {
    if (focus && !error) return themeGet('colors.grey900')
    else if (active && !disabled) return themeGet('colors.pink500')
    else if (error) return themeGet('colors.red500')
    else return themeGet('colors.grey300')
  }};
  background-color: ${({disabled}) => {
    disabled ? themeGet('colors.grey100') : themeGet('colors.white')
  }};
  padding: ${({area, theme: {space}}) =>
    area
      ? `${space[4]}px ${space[4]}px ${space[4]}px ${space[4]}px`
      : `${space[0]}px ${space[4]}px ${space[0]}px ${space[4]}px`};
  ${buttonHeight};
  ${border};
  ${borderColor};
  ${space};
`

container.propTypes = {
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
    disabled ? colors.grey500 : colors.grey900};
  ${defaultFontFamily};
  ${color};
  ${buttonFontSize};
  ${letterSpacing};
  ${fontFamily};
`

text.propTypes = {
  ...color.propTypes,
  ...fontFamily.propTypes
}

text.defaultProps = {
  fontSize: 'default',
  letterSpacing: 'default'
}

export const error = css`
  color: ${themeGet('colors.pink500')};
  ${defaultFontFamily};
  ${buttonFontSize};
  ${letterSpacing};
`

error.defaultProps = {
  fontSize: 'small',
  letterSpacing: 'default'
}

export const placeholder = css`
  color: ${themeGet('colors.grey500')};
`

placeholder.propTypes = {}
