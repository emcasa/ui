import React from 'react'
import styled from 'styled-components'
import DropdownGroup from '@emcasa/ui/lib/components/Dropdown/Group'
import * as dropdown from '@emcasa/ui/lib/components/Dropdown'

import DropdownContainer from './Container'
import DropdownButton from './Button'

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
const Dropdown = DropdownGroup({DropdownButton, DropdownContainer})(
  styled.div`
    z-index: ${({zIndex = 0, focused}) => zIndex + (focused ? 1 : 0)};
    position: relative;
  `
)

export default Dropdown

Dropdown.displayName = 'Dropdown'

Dropdown.Option = DropdownOption
