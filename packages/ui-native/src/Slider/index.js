import React from 'react'
import styled from 'styled-components/native'
import Slider, * as slider from '@emcasa/ui/lib/components/Slider'

import MarkerHandler from './MarkerHandler'
import View from '../View'
import Row from '../View'

const Marker = styled(View)`
  ${slider.marker};
`

Marker.displayName = 'SliderMarker'

Marker.defaultProps = slider.marker.defaultProps

const Track = styled(View)`
  ${slider.track};
`

Track.displayName = 'SliderTrack'

Track.defaultProps = slider.track.defaultProps

const Container = styled(function SliderContainer({
  children,
  onLayout,
  trackProps,
  ...props
}) {
  return (
    <Row height={50} justifyContent="center" {...props}>
      {children}
      <Row
        width="100%"
        onLayout={({nativeEvent: {layout}}) => onLayout(layout)}
      >
        <Track {...trackProps} />
      </Row>
    </Row>
  )
})`
  ${slider.container};
`

Container.defaultProps = slider.container.defaultProps

const SliderComponent = Slider({MarkerHandler})(Container)

SliderComponent.Marker = Marker

export default SliderComponent
