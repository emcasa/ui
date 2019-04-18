import React, {PureComponent} from 'react'
import {ControlledFilter} from './Filter'
import Slider from '../Slider'
import View from '../View'
import Text from '../Text'

export class SliderRange extends PureComponent {
  render() {
    const {
      value,
      range,
      onChange,
      initialValue,
      currentValue,
      formatValue,
      formatLabel
    } = this.props
    const displayValue = currentValue || initialValue
    return (
      <View pr={2} pl={2}>
        {formatLabel && (
          <Text fontSize="small" textAlign="center">
            {formatLabel(displayValue)}
          </Text>
        )}
        <Slider
          height="medium"
          range={range}
          initialValue={displayValue}
          formatValue={formatValue}
          onChange={onChange}
          trackProps={{bg: 'lightGrey'}}
        >
          <Slider.Marker name="min" />
          <Slider.Marker name="max" trackProps={{bg: 'pink'}} />
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
