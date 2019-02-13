import React, {PureComponent} from 'react'
import {ControlledFilter} from './Filter'
import Button from '../Button'

export class ButtonGroup extends PureComponent {
  render() {
    const {children, value, onChange} = this.props
    return (
      <Button.Group selectedValue={value} onChange={onChange}>
        {React.Children.map(children, (element) =>
          React.cloneElement(element, {
            type: 'button'
          })
        )}
      </Button.Group>
    )
  }
}

export default function ButtonGroupFilter(props) {
  return (
    <ControlledFilter {...props}>
      {({field}) => <ButtonGroup {...field} {...props} />}
    </ControlledFilter>
  )
}
