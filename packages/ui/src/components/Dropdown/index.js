import {css} from 'styled-components'
import {themeGet, color, width, maxHeight} from 'styled-system'
import PropTypes from 'prop-types'

import {buttonHeight, fontSize} from '../../styles'
import {container as row} from '../Row'
import {container as col} from '../Col'

/**
 * Dropdown component structure:
 *
 * <target>
 *   <button></button>
 *   <container>
 *     <option />
 *     <option />
 *   </container>
 * <target>
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
  background-color: white;
  ${maxHeight};
  ${col};
  display: ${({focused}) => (focused ? 'flex' : 'none')};
`

container.propTypes = {
  focused: PropTypes.bool,
  /**
   * Target element ref
   */
  target: PropTypes.element,
  /**
   * Triggers dropdown focus
   */
  onDropdownFocus: PropTypes.func,
  onDropdownBlur: PropTypes.func,
  ...width.propTypes,
  ...col.propTypes
}

export const button = css`
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  border-radius: 4px;
  border: 1px solid
    ${({focused, theme}) =>
      focused ? theme.colors.blue : theme.colors.lightGrey};
  background-color: white;
  ${width};
  ${buttonHeight};
  ${row};
`

button.text = css`
  color: ${themeGet('colors.dark')};
  ${fontSize};
  ${color};
`

button.propTypes = {
  focused: PropTypes.bool,
  onFocusChange: PropTypes.func,
  ...width.propTypes,
  ...buttonHeight.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
  ...row.propTypes
}

export const option = css`
  align-items: center;
  margin: 0 5px 5px;
  height: ${themeGet('buttonHeight.1')}px;
  border: 1px solid
    ${({selected, theme}) => (selected ? theme.colors.pink : 'transparent')};
  border-radius: 4px;
  background-color: transparent;
  ${row};
  flex: 1 0 100%;
`

option.text = css`
  text-align: left;
  ${fontSize};
  ${color};
`

option.hover = css`
  border-color: ${themeGet('colors.pink')};
`

option.propTypes = {
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
  ...fontSize.propTypes,
  ...color.propTypes,
  ...row.propTypes
}

export const propTypes = {
  containerProps: PropTypes.shape(container.propTypes),
  ...button.propTypes
}
