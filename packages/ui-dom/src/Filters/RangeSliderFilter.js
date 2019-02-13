import React, {PureComponent} from 'react'
import {ControlledFilter} from './Filter'
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

export default function RangeSliderFilter(props) {
  return (
    <ControlledFilter {...props}>
      {({field}) => <RangeSlider {...field} {...props} />}
    </ControlledFilter>
  )
}
