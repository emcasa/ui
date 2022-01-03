import React from 'react'
import styled from 'styled-components'
import {width} from 'styled-system'
import DropdownGroup from '@emcasa/ui/lib/components/Dropdown/Group'

import DropdownContainer from './Container'
import DropdownButton from './Button'
import DropdownOption from './Option'
import DropdownMessage from './Message'

/**
 * Dropdown
 */
const Dropdown = DropdownGroup({DropdownButton, DropdownContainer})(
  styled.div`
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    ${width};
  `
)

export default Dropdown

Dropdown.displayName = 'Dropdown'

Dropdown.Option = DropdownOption
Dropdown.Message = DropdownMessage
