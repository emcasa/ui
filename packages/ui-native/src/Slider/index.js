import React from 'react'
import styled from 'styled-components/native'
import Slider, * as slider from '@emcasa/ui/lib/components/Slider'

import MarkerHandler from './MarkerHandler'
import SliderTrack from './SliderTrack'
import View from '../View'

const Marker = styled(View)`
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
