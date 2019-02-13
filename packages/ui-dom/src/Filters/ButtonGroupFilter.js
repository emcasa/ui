import React, {PureComponent} from 'react'
import {Field} from 'formik'
import Filter from './Filter'
import Slider from './Slider'

export class RangeSlider extends PureComponent {
  render() {
    const {values, range, onChange} = this.state
    return (
      <Slider selectedValues={values} range={range} onChange={onChange}>
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
    const {label, name, selected, onDismiss, ...props} = this.props
    return (
      <Field
        name={name}
        render={({field}) => (
          <Filter
            label={label}
            selected={selected}
            onDismiss={onDismiss}
            onSubmit={() => field.onChange(this.state.value)}
          >
            <RangeSlider {...field} {...props} onChange={this.onChange} />
          </Filter>
        )}
      />
    )
  }
}
