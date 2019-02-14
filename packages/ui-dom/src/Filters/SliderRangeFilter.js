import React, {PureComponent} from 'react'
import {ControlledFilter} from './Filter'
import Slider from '../Slider'
import View from '../View'

export class SliderRange extends PureComponent {
  render() {
    const {value, range, onChange, initialValue, currentValue} = this.props
    return (
      <View pr={2} pl={2}>
        <Slider
          height="medium"
          range={range}
          initialValue={currentValue || value || initialValue}
          onChange={onChange}
        >
          <Slider.Marker name="min" />
          <Slider.Marker name="max" />
        </Slider>
      </View>
    )
  }
}

export default function SliderRangeFilter(props) {
  return (
    <ControlledFilter {...props}>
      {({field}) => <SliderRange {...field} {...props} />}
    </ControlledFilter>
  )
}
