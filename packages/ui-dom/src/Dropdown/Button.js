import React from 'react'
import styled from 'styled-components'
import {button} from '@emcasa/ui/lib/components/Dropdown'

import Icon from '../Icon'

/**
 * DropdownButton
 */
const DropdownButton = styled(
  ({children, id, className, style, onClick, focused, icon, type}) => {
    return (
      <div
        tabIndex={0}
        id={id}
        className={className}
        style={style}
        onMouseDown={onClick}
      >
        <Icon
          name={icon ? icon : focused ? 'caret-up' : 'caret-down'}
          type={type}
          color="dark"
          size={18}
          mt="5px"
          mr="5px"
        />
        {children}
      </div>
    )
  }
)`
  z-index: 0;
  outline: none;
  cursor: pointer;
  ${button};
  ${button.text};
`

DropdownButton.displayName = 'DropdownButton'

DropdownButton.propTypes = button.propTypes

export default DropdownButton
