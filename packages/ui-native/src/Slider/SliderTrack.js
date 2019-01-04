import React, {PureComponent} from 'react'
import {Animated, StyleSheet} from 'react-native'
import styled from 'styled-components/native'
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

export default class SliderTrackContainer extends PureComponent {
  static defaultProps = {
    markers: [],
    sliderLayout: {},
    trackProps: {}
  }

  sliderWidth = new Animated.Value(1)

  componentDidUpdate(prevProps) {
    if (this.props.sliderLayout !== prevProps.sliderLayout)
      this.sliderWidth.setValue(this.props.sliderLayout.width)
  }

  renderMarkerTrack = (element, prevElement, index) => {
    const {trackProps} = element.props
    if (!trackProps) return
    const position = element.ref.current.computedPosition
    const offset = prevElement
      ? prevElement.ref.current.computedPosition
      : new Animated.Value(0)
    return (
      <MarkerTrack
        key={element.key}
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

  renderTrack() {
    const {markers} = this.props
    const children = []
    let prevMarker = undefined
    React.Children.forEach(markers, (element, index) => {
      if (!element.ref.current) return
      children.push(this.renderMarkerTrack(element, prevMarker, index))
      prevMarker = element
    })
    return children
  }

  render() {
    const {markers, trackProps} = this.props
    return (
      <View width="100%" height="1px">
        {markers.length && this.renderTrack()}
        <Track zIndex={0} {...trackProps} />
      </View>
    )
  }
}
