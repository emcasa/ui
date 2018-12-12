import React from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components/native'
import Slider, * as slider from '@emcasa/ui/lib/components/Slider'

import Marker from './Marker'
import View from '../View'
import Row from '../View'

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
    <Row height={50} width="100%" justifyContent="center" {...props}>
      {children}
      <View
        width="100%"
        onLayout={({nativeEvent: {layout}}) => onLayout(layout)}
      >
        <Track {...trackProps} />
      </View>
    </Row>
  )
})`
  ${slider.container};
`

Container.defaultProps = slider.container.defaultProps

const SliderComponent = Slider(Container)

SliderComponent.Marker = Marker

export default SliderComponent
