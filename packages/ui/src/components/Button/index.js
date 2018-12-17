import PropTypes from 'prop-types'
import {
  color,
  space,
  fontFamily,
  flex,
  flexDirection,
  alignItems,
  justifyContent
} from 'styled-system'
import {css} from 'styled-components'

import {
  letterSpacing,
  buttonHeight,
  fontSize,
  defaultFontFamily
} from '../../styles'

const buttonProps = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  link: PropTypes.bool
}

export const container = css`
  padding: 0 20px 0 20px;
  border-color: ${({active, disabled, theme: {colors}}) =>
    active && !disabled ? colors.pink : colors.lightGrey};
  background-color: ${({active, disabled, theme: {colors}}) =>
    active && !disabled ? colors.pink : colors.white};
  ${({link}) =>
    link
      ? {borderRadius: 0, borderWidth: 0}
      : {borderRadius: '4px', borderWidth: '1px'}}
  width: ${({fluid}) => (fluid ? '100%' : 'auto')};
  ${buttonHeight}
  ${space}
  ${flex}
  ${flexDirection}
  ${alignItems}
  ${justifyContent}
`

container.propTypes = {
  ...buttonProps,
  ...buttonHeight.propTypes,
  ...space.propTypes,
  ...flex.propTypes,
  ...flexDirection.propTypes,
  ...alignItems.propTypes,
  ...justifyContent.propTypes
}

container.defaultProps = {
  height: 'medium',
  fluid: false
}

export const text = css`
  color: ${({active, disabled, link, theme: {colors}}) => {
    if (disabled) return colors.disabled
    else if (active) return colors.white
    else if (link) return colors.pink
    else return colors.dark
  }};
  ${defaultFontFamily}
  ${letterSpacing}
  ${fontFamily}
  ${fontSize}
  ${color}
`

text.propTypes = {
  ...buttonProps,
  ...letterSpacing.propTypes,
  ...fontFamily.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes
}

text.defaultProps = {
  fontSize: 'default'
}
