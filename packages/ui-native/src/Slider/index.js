import React from 'react'
import {Animated} from 'react-native'
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

const SliderComponent = Slider({
  MarkerHandler,
  Marker,
  SliderTrack,
  getInitialMarkerState: () => ({
    animatedValue: new Animated.Value(0),
    getComputedPosition() {
      const {animatedValue, bounds} = this
      const min = bounds.left + 1
      const max = bounds.right - 1
      return animatedValue.interpolate({
        inputRange: [bounds.left, bounds.right],
        outputRange: [min, max],
        extrapolate: 'clamp'
      })
    }
  })
})(Container)

SliderComponent.Marker = Marker

export default SliderComponent
