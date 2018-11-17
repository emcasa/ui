import React from 'react'
import {View as RCTView} from 'react-native'
import DropdownGroup from '@emcasa/ui/lib/components/Dropdown/Group'

import DropdownContainer from './Container'
import DropdownButton from './Button'
import DropdownOption from './Option'

/**
 * Dropdown
 */
const Dropdown = DropdownGroup({DropdownButton, DropdownContainer})(RCTView)

export default Dropdown

Dropdown.displayName = 'Dropdown'

Dropdown.Option = DropdownOption
