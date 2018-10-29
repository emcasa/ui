import {css} from 'styled-components'
import {fontFamily} from 'styled-system'

import {container as text} from '../Text'
import {
  buttonHeight,
  fontSize,
  letterSpacing,
  defaultFontFamily
} from '../../styles'

export {default} from './hoc'

export const BULLET_SIZE = 18
export const BULLET_BORDER = 2
export const INNER_BULLET_SIZE = 6

export const container = css`
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({checked, theme: {colors}}) =>
    checked ? colors.pink : colors.lightGrey};
  padding: 10px;
  display: flex;
  align-items: center;
  ${buttonHeight};
`

container.propTypes = {
  ...buttonHeight.propTypes
}

container.defaultProps = {
  height: 'tall',
  fontSize: 'default',
  letterSpacing: 'default'
}

export const button = css`
  width: ${BULLET_SIZE}px;
  height: ${BULLET_SIZE}px;
  border-radius: ${BULLET_SIZE}px;
  border: ${BULLET_BORDER}px solid
    ${({checked, theme: {colors}}) => (checked ? colors.pink : colors.grey)};
  background-color: ${({checked, disabled, theme: {colors}}) => {
    if (!checked) return 'transparent'
    else if (disabled) return colors.grey
    else return colors.pink
  }};
  margin-right: 14px;
`

button.propTypes = {}

const checkMarkMargin =
  (BULLET_SIZE - INNER_BULLET_SIZE - BULLET_BORDER * 2) / 2

export const checkMark = css`
  width: ${INNER_BULLET_SIZE}px;
  height: ${INNER_BULLET_SIZE}px;
  border-radius: ${INNER_BULLET_SIZE}px;
  margin: ${checkMarkMargin}px;
  background-color: white;
`

checkMark.propTypes = {}

export const label = css`
  color: ${({disabled, theme: {colors}}) =>
    disabled ? colors.disabled : colors.dark};
  ${text};
  ${defaultFontFamily};
  ${fontSize};
  ${letterSpacing};
  ${fontFamily};
`

label.propTypes = {
  ...fontSize.propTypes,
  ...letterSpacing.propTypes,
  ...fontFamily.propTypes
}
