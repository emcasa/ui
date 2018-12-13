import React from 'react'
import styled from 'styled-components/native'
import Slider, * as slider from '@emcasa/ui/lib/components/Slider'

import MarkerHandler from './MarkerHandler'
import SliderTrack from './SliderTrack'
import View from '../View'

const MarkerLabel = styled(View)`
  ${slider.marker.label};
`

const Marker = styled(function SliderMarker({style, onLayout, size, label}) {
  return (
    <View style={style} onLayout={onLayout}>
      {label && <MarkerLabel size={size}>{label}</MarkerLabel>}
    </View>
  )
})`
  ${slider.marker};
`

Marker.displayName = 'SliderMarker'

Marker.defaultProps = slider.marker.defaultProps

const Container = styled(function SliderContainer({onLayout, ...props}) {
  return (
    <View onLayout={({nativeEvent: {layout}}) => onLayout(layout)} {...props} />
  )
})`
  ${slider.container};
`

Container.defaultProps = slider.container.defaultProps

const SliderComponent = Slider({MarkerHandler, SliderTrack})(Container)

SliderComponent.Marker = Marker

export default SliderComponent
