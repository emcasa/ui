import React, {PureComponent} from 'react'
import {ControlledFilter} from './Filter'
import Slider from '../Slider'
import View from '../View'

export class RangeSlider extends PureComponent {
  render() {
    const {value, onChange} = this.props
    return (
      <View pr={2} pl={2}>
        <Slider height="medium" selectedValues={value} onChange={onChange}>
          <Slider.Marker name="min" />
          <Slider.Marker name="max" />
        </Slider>
      </View>
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
