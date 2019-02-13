import React, {PureComponent} from 'react'
import {Field} from 'formik'
import Filter from './Filter'
import Slider from '../Slider'

export class RangeSlider extends PureComponent {
  render() {
    const {value, onChange} = this.props
    return (
      <Slider selectedValues={value} onChange={onChange}>
        <Slider.Marker name="min" />
        <Slider.Marker name="max" />
      </Slider>
    )
  }
}

export default class RangeSliderFilter extends PureComponent {
  state = {value: undefined}

  onChange = (value) => this.setState({value})

  onSubmit = () => this.props.onSubmit(this.state.value)

  render() {
    const {label, name, selected, onSelect, ...props} = this.props
    return (
      <Field
        name={name}
        render={({field, form}) => (
          <Filter
            label={label}
            selected={selected}
            onSelect={onSelect}
            onClear={() => form.setFieldValue(name, undefined)}
            onSubmit={() => form.setFieldValue(name, this.state.value)}
          >
            <RangeSlider {...field} {...props} onChange={this.onChange} />
          </Filter>
        )}
      />
    )
  }
}
