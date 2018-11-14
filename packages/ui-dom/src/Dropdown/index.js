import React from 'react'
import styled from 'styled-components'
import DropdownGroup from '@emcasa/ui/lib/components/Dropdown/Group'
import * as dropdown from '@emcasa/ui/lib/components/Dropdown'

import Row from '../Row'
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
        onClick={onClick}
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
  outline: none;
  cursor: pointer;
  ${dropdown.button};
  ${dropdown.button.text};
`

DropdownButton.displayName = 'DropdownButton'

DropdownButton.propTypes = dropdown.button.propTypes

const DropdownContainer = styled.div`
  ${dropdown.container};
`

DropdownContainer.displayName = 'DropdownContainer'

DropdownContainer.propTypes = dropdown.container.propTypes

/**
 * DropdownOption
 */
const DropdownOption = styled(({onSelect, ...props}) => {
  delete props.selected, props.height, props.width
  return <button onClick={onSelect} {...props} />
})`
  outline: none;
  cursor: pointer;
  ${dropdown.option};
  ${dropdown.option.text};
  &:hover {
    ${dropdown.option.hover};
  }
`

DropdownOption.displayName = 'DropdownOption'

// DropdownOption.propTypes = dropdown.container.propTypes

/**
 * Dropdown
 */
const Dropdown = DropdownGroup({DropdownButton, DropdownContainer})('div')

export default Dropdown

Dropdown.displayName = 'Dropdown'

Dropdown.Option = DropdownOption
