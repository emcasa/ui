import {css} from 'styled-components'
import {
  themeGet,
  color,
  width,
  maxHeight,
  textAlign,
  borderColor,
  backgroundColor
} from 'styled-system'
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
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: ${themeGet('colors.lightGrey')};
  border-top-width: 0px;
  padding-top: 5px;
  background-color: white;
  ${maxHeight};
  ${({layout}) => layout};
`

container.contentContainer = css`
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  ${col};
`

container.propTypes = {
  layout: PropTypes.object,
  focused: PropTypes.bool,
  /**
   * Target element ref
   */
  target: PropTypes.object,
  /**
   * Triggers dropdown focus
   */
  onDropdownFocus: PropTypes.func,
  onDropdownBlur: PropTypes.func,
  ...width.propTypes,
  ...col.propTypes
}

export const button = css`
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({focused, theme}) =>
    focused ? theme.colors.blue : theme.colors.lightGrey};
  background-color: white;
  ${row};
  ${width};
  ${buttonHeight};
  ${borderColor};
  ${backgroundColor};
`

button.textContainer = css`
  flex: 1;
  margin-right: 10px;
  margin-left: 10px;
`

button.text = css`
  color: ${({isPlaceholder, theme}) =>
    isPlaceholder ? theme.colors.disabled : theme.colors.dark};
  ${fontSize};
  ${textAlign};
  ${color};
`

button.pseudoBackground = css`
  z-index: -1;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 10px;
  background-color: white;
  border-top-width: 0;
  border-bottom-width: 0;
  border-left-width: 1px;
  border-right-width: 1px;
  border-style: solid;
  border-color: ${themeGet('colors.lightGrey')};
`

button.propTypes = {
  focused: PropTypes.bool,
  onFocusChange: PropTypes.func,
  onLayout: PropTypes.func,
  ...width.propTypes,
  ...buttonHeight.propTypes,
  ...textAlign.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
  ...row.propTypes
}

export const option = css`
  flex-direction: row;
  align-items: center;
  margin: 0 5px 5px;
  padding: 0 10px;
  height: ${themeGet('buttonHeight.1')}px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({selected, theme}) =>
    selected ? theme.colors.pink : 'transparent'};
  border-radius: 4px;
  background-color: transparent;
  ${row};
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 100%;
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

option.defaultProps = {
  fontSize: 'default'
}

export const propTypes = {
  containerProps: PropTypes.shape(container.propTypes),
  blurOnChange: PropTypes.bool,
  ...button.propTypes
}
