import React, {PureComponent} from 'react'
import {ControlledFilter} from './Filter'
import Slider from '../Slider'
import View from '../View'
import Text from '../Text'

export class SliderRange extends PureComponent {
  render() {
    const {
      range,
      onChange,
      initialValue,
      currentValue,
      formatValue,
      formatLabel
    } = this.props
    const displayValue = Object.assign({}, currentValue || initialValue)
    if (isNaN(displayValue.min) || displayValue.min === null)
      displayValue.min = range[0]
    if (isNaN(displayValue.max) || displayValue.max === null)
      displayValue.max = range[1]
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
          onChange={({...value}) => {
            if (value.min === range[0]) value.min = undefined
            if (value.max === range[1]) value.max = undefined
            if (value.max === undefined && value.min === undefined)
              onChange(undefined)
            else onChange(value)
          }}
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
