import {css} from 'styled-components'

import {container as text} from '../Text'
import {buttonHeight, fontSize, letterSpacing, fontFamily} from '../../styles'

export {default} from './hoc'

export const BULLET_SIZE = 18
export const BULLET_BORDER = 2
export const INNER_BULLET_SIZE = 10

export const container = css`
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({checked, theme: {colors}}) =>
    checked ? colors.pink : colors.lightGrey};
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  ${buttonHeight};
  ${fontSize}
  ${letterSpacing}
  ${fontFamily}
`

container.defaultProps = {
  height: 'tall',
  fontSize: 'default',
  letterSpacing: 'default',
  fontFamily: 'FaktSoftPro-Normal'
}

export const button = css`
  width: ${BULLET_SIZE}px;
  height: ${BULLET_SIZE}px;
  border-radius: ${BULLET_SIZE}px;
  border: ${BULLET_BORDER}px solid
    ${({disabled, theme: {colors}}) => (disabled ? colors.grey : colors.pink)};
  background-color: ${({checked, disabled, theme: {colors}}) => {
    if (!checked) 'transparent'
    else if (disabled) return colors.grey
    else return colors.pink
  }};
  margin-right: 14px;
`

const checkMarkMargin =
  (BULLET_SIZE - INNER_BULLET_SIZE - BULLET_BORDER * 2) / 2

export const checkMark = css`
  width: ${INNER_BULLET_SIZE}px;
  height: ${INNER_BULLET_SIZE}px;
  border-radius: ${INNER_BULLET_SIZE}px;
  margin: ${checkMarkMargin}px;
  background-color: white;
`

export const label = css`
  color: ${({disabled, theme: {colors}}) =>
    disabled ? colors.disabled : colors.dark};
  ${text};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`
