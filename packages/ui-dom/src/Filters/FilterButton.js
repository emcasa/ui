import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import {BUTTON_HEIGHT} from './constants'

const BUTTON_STYLE = ({theme, style, active, selected}) => {
  if (style) return style
  if (active || selected) return undefined
  return {
    color: theme.colors.pink,
    borderColor: theme.colors.pink
  }
}

const FilterButton = styled(({active, selected, ...props}) => {
  delete props.disabled
  return <Button active={active || selected} {...props} />
}).attrs((props) => ({
  height: BUTTON_HEIGHT(props),
  style: BUTTON_STYLE(props)
}))`
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  transition: ${['color', 'border-color', 'opacity']
    .map((prop) => `${prop} 200ms ease-in-out`)
    .join()};
`

FilterButton.defaultProps = {
  type: 'button',
  fontSize: 'small'
}

export default FilterButton
