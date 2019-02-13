import React, {PureComponent} from 'react'
import {Field} from 'formik'
import Filter from './Filter'
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

export default class ButtonGroupFilter extends PureComponent {
  static Button = Button

  state = {value: undefined}

  onChange = (value) => this.setState({value})

  onSubmit = () => this.props.onSubmit(this.state.value)

  render() {
    const {label, name, selected, onSelect, ...props} = this.props
    const {value} = this.state
    return (
      <Field
        name={name}
        render={({field, form}) => (
          <Filter
            label={label}
            selected={selected}
            onSelect={onSelect}
            onClear={() => {
              this.setState({value: null})
              form.setFieldValue(name, undefined)
            }}
            onSubmit={() => form.setFieldValue(name, value)}
          >
            <ButtonGroup
              {...field}
              {...props}
              value={value}
              onChange={this.onChange}
            />
          </Filter>
        )}
      />
    )
  }
}
