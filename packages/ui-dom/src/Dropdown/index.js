import React from 'react'
import styled from 'styled-components'
import DropdownGroup from '@emcasa/ui/lib/components/Dropdown/Group'

import DropdownContainer from './Container'
import DropdownButton from './Button'
import DropdownOption from './Option'

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
