import React, {PureComponent} from 'react'
import {Animated, StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {withSliderContext} from '@emcasa/ui/lib/components/Slider/Context'
import * as slider from '@emcasa/ui/lib/components/Slider'

import View from '../Row'

const Track = styled(function SliderTrack({style, ...props}) {
  const {height} = StyleSheet.flatten(style)
  return <Animated.View style={[style, {marginTop: -height / 2}]} {...props} />
})`
  ${slider.track};
`

Track.displayName = 'SliderTrack'

Track.defaultProps = slider.track.defaultProps

class MarkerTrack extends PureComponent {
  static defaultProps = {
    offset: new Animated.Value(0)
  }

  get animation() {
    const {position, offset, sliderWidth} = this.props
    const width = Animated.add(position, Animated.multiply(offset, -1))
    const scale = Animated.divide(width, sliderWidth)
    const scaleOffset = Animated.multiply(
      Animated.divide(
        Animated.add(sliderWidth, Animated.multiply(width, -1)),
        2
      ),
      -1
    )
    return [{translateX: Animated.add(offset, scaleOffset)}, {scaleX: scale}]
  }

  render() {
    const {...props} = this.props
    delete props.position
    delete props.offset
    return (
      <Track
        useNativeDriver={this.props.useNativeDriver}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          transform: this.animation
        }}
        {...props}
      />
    )
  }
}

class SliderTrackContainer extends PureComponent {
  static defaultProps = {
    slider: {},
    trackProps: {}
  }

  sliderWidth = new Animated.Value(1)

  componentDidUpdate(prevProps) {
    if (this.props.sliderLayout !== prevProps.sliderLayout)
      this.sliderWidth.setValue(this.props.sliderLayout.width)
  }

  renderMarkerTrack = (marker, index) => {
    const {trackProps} = marker.element.props
    if (!trackProps) return
    const prevMarker = index > 0 && this.props.markers[index - 1]
    const position = marker.state.getComputedPosition()
    const offset = prevMarker
      ? prevMarker.state.getComputedPosition()
      : undefined
    return (
      <MarkerTrack
        key={marker.key}
        zIndex={index + 1}
        position={position}
        offset={offset}
        sliderWidth={this.sliderWidth}
        useNativeDriver={this.props.useNativeDriver}
        {...this.props.trackProps}
        {...trackProps}
      />
    )
  }

  render() {
    const {markers, trackProps} = this.props
    return (
      <View width="100%" height="1px">
        {markers && markers.map(this.renderMarkerTrack)}
        <Track zIndex={0} {...trackProps} />
      </View>
    )
  }
}

export default withSliderContext(({markers, layout, useNativeDriver}) => ({
  markers,
  sliderLayout: layout,
  useNativeDriver
}))(SliderTrackContainer)
