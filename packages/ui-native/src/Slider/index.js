import React from 'react'
import styled from 'styled-components/native'
import Slider, * as slider from '@emcasa/ui/lib/components/Slider'

import Marker from './Marker'
import View from '../View'

const Track = styled(View)`
  ${slider.track};
`

Track.defaultProps = slider.track.defaultProps

const SliderComponent = Slider(({children, style, onLayout, ...props}) => (
  <View
    style={style}
    onLayout={({nativeEvent: {layout}}) => onLayout(layout)}
    {...props}
  >
    {children}
    <Track {...props} />
  </View>
))

SliderComponent.Marker = Marker

export default SliderComponent
