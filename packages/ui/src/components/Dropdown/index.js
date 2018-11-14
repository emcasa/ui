import {css} from 'styled-components'
import {
  themeGet,
  space,
  width,
  maxHeight,
  flex,
  alignSelf,
  bgColor
} from 'styled-system'
import PropTypes from 'prop-types'

import {buttonHeight, fontSize} from '../../styles'
import {container as row} from '../Row'
import {container as col} from '../Col'

/**
 * Dropdown component structure:
 *
 * <>
 *   <button></button>
 *   <container>
 *     <option />
 *     <option />
 *   </container>
 * <>
 */

export const container = css`
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-top-width: 0px;
  padding-top: 5px;
  ${space};
  ${maxHeight};
  ${col};
  display: ${({focused}) => (focused ? 'flex' : 'none')};
`

container.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...flex.propTypes,
  ...alignSelf.propTypes,
  ...bgColor.propTypes
}

export const button = css`
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  border-radius: 4px;
  border: 1px solid
    ${({focused, theme}) =>
      focused ? theme.colors.blue : theme.colors.lightGrey};
  ${width};
  ${buttonHeight};
  ${row};
`

button.text = css`
  color: ${themeGet('colors.dark')};
  ${fontSize};
`

button.propTypes = {
  focus: PropTypes.bool,
  ...width.propTypes,
  ...buttonHeight.propTypes,
  ...fontSize.propTypes,
  ...row.propTypes
}

export const option = css`
  margin: 0 5px 5px;
  height: ${themeGet('buttonHeight.1')}px;
  border: 1px solid
    ${({selected, theme}) => (selected ? theme.colors.pink : 'transparent')};
  border-radius: 4px;
`

option.hover = css`
  border-color: ${themeGet('colors.pink')};
`

export const propTypes = {
  buttonProps: PropTypes.shape(button.propTypes),
  ...space.propTypes
}
