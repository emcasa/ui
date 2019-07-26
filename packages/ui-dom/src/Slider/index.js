import React from 'react'
import styled from 'styled-components'
import {value} from 'popmotion'
import Measure from 'react-measure'
import Slider, * as slider from '@emcasa/ui/lib/components/Slider'

import MarkerHandler from './MarkerHandler'
import SliderTrack from './SliderTrack'
import View from '../View'

const MarkerLabel = styled(View)`
  ${slider.marker.label};
  margin-bottom: 50%;
  margin-left: -50%;
  left: ${({size}) => size}px;
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
    <Measure
      onResize={({entry}) => {
        if (!entry) {
          return
        }
        return onLayout({
          width: entry.width,
          height: entry.height
        })
      }}
    >
      {({measureRef}) => <View ref={measureRef} {...props} />}
    </Measure>
  )
})`
  ${slider.container};
  position: relative;
`

Container.defaultProps = slider.container.defaultProps

const SliderComponent = Slider({
  MarkerHandler,
  Marker,
  SliderTrack,
  getInitialMarkerState: ({position}) => ({
    animatedValues: {x: value(position)}
  })
})(Container)

SliderComponent.Marker = Marker

export default SliderComponent
