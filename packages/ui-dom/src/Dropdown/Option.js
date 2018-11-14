import React from 'react'
import styled from 'styled-components'
import {option} from '@emcasa/ui/lib/components/Dropdown'

import Icon from '../Icon'

const DropdownOption = styled(({children, id, className, style, onSelect}) => {
  return (
    <button
      tabIndex={0}
      id={id}
      className={className}
      style={style}
      onMouseDown={onSelect}
    >
      {children}
    </button>
  )
})`
  outline: none;
  cursor: pointer;
  ${option};
  ${option.text};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover,
  &:focus {
    ${option.hover};
  }
`

DropdownOption.displayName = 'DropdownOption'

DropdownOption.propTypes = option.propTypes

export default DropdownOption
