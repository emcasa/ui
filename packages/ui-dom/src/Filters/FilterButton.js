import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import {BUTTON_HEIGHT} from './constants'

const FilterButton = styled(({active, selected, ...props}) => {
  delete props.disabled
  return <Button active={active || selected} {...props} />
}).attrs({
  height: BUTTON_HEIGHT,
  style: ({theme, style, active, selected}) =>
    style
      ? style
      : !(active || selected)
        ? {
            color: theme.colors.pink,
            borderColor: theme.colors.pink
          }
        : undefined
})`
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
