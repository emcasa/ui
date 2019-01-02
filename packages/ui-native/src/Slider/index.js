import React from 'react'
import styled from 'styled-components/native'
import Slider, * as slider from '@emcasa/ui/lib/components/Slider'

import MarkerHandler from './MarkerHandler'
import SliderTrack from './SliderTrack'
import View from '../View'

const MarkerLabel = styled(View)`
  ${slider.marker.label};
`

MarkerLabel.displayName = 'SliderMarkerLabel'

const Marker = styled(function SliderMarker({
  style,
  size,
  markerState,
  renderLabel,
  ...props
}) {
  return (
    <View style={style} {...props}>
      {renderLabel && (
        <MarkerLabel size={size}>{renderLabel(markerState)}</MarkerLabel>
      )}
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

const SliderComponent = Slider({MarkerHandler, Marker, SliderTrack})(Container)

SliderComponent.Marker = Marker

export default SliderComponent
