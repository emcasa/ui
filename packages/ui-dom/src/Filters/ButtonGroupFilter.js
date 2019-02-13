import React from 'react'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {ControlledFilter} from './Filter'
import Button from '../Button'

export const ButtonGroup = styled(function ButtonGroup({
  children,
  style,
  className,
  strategy,
  currentValue,
  value,
  onChange
}) {
  return (
    <Button.Group
      style={style}
      className={className}
      strategy={strategy}
      selectedValue={currentValue || value}
      onChange={onChange}
    >
      {React.Children.map(children, (element) =>
        React.cloneElement(element, {
          className: 'filterButton',
          type: 'button'
        })
      )}
    </Button.Group>
  )
})`
  margin-left: -${themeGet('space.3')}px;
  margin-bottom: -${themeGet('space.3')}px;
  flex-wrap: wrap;
  .filterButton {
    margin-left: ${themeGet('space.3')}px;
    margin-bottom: ${themeGet('space.3')}px;
  }
`

export default function ButtonGroupFilter(props) {
  return (
    <ControlledFilter {...props}>
      {({field}) => <ButtonGroup {...field} {...props} />}
    </ControlledFilter>
  )
}
