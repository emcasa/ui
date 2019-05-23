import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Icon from '../Icon'
import {BUTTON_HEIGHT} from './constants'

const FilterButton = styled(({active, selected, ...props}) => {
  delete props.disabled
  return <Button active={active || selected} {...props} />
}).attrs((props) => ({
  height: BUTTON_HEIGHT(props)
}))`
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  transition: ${['color', 'border-color', 'opacity']
    .map((prop) => `${prop} 200ms ease-in-out`)
    .join()};

  border-color: ${({active, selected, disabled, theme: {colors}}) =>
    (active || selected) && !disabled ? colors.blue : colors.lightGrey};
  background-color: ${({active, selected, disabled, theme: {colors}}) =>
    (active || selected) && !disabled ? colors.blue : colors.white};
  color: ${({active, selected, disabled, link, theme: {colors}}) => {
    if (disabled) return colors.disabled
    else if (link) return colors.blue
    else if (active || selected) return colors.white
    else return colors.dark
  }};

  ${Icon} {
    display: ${({active, selected}) => (active || selected ? 'none' : 'block')};
  }
`

FilterButton.defaultProps = {
  type: 'button',
  height: 'medium',
  fontSize: 'small'
}

export default FilterButton
