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

export default class SliderTrackContainer extends PureComponent {
  static defaultProps = {
    markers: [],
    sliderLayout: {}
  }

  sliderWidth = new Animated.Value(1)

  componentDidUpdate(prevProps) {
    if (this.props.sliderLayout !== prevProps.sliderLayout)
      this.sliderWidth.setValue(this.props.sliderLayout.width)
  }

  getMarkerAnimation(element, prevElement) {
    const position = element.ref.current.computedPosition
    const offset = prevElement
      ? prevElement.ref.current.computedPosition
      : new Animated.Value(0)
    const width = prevElement
      ? Animated.add(position, Animated.multiply(offset, -1))
      : position
    const scale = Animated.divide(width, this.sliderWidth)
    const scaleOffset = Animated.multiply(
      Animated.divide(
        Animated.add(this.sliderWidth, Animated.multiply(width, -1)),
        2
      ),
      -1
    )
    return [{translateX: Animated.add(offset, scaleOffset)}, {scaleX: scale}]
  }

  renderMarkerTrack = (element, prevElement, index) => {
    const {trackProps} = element.props
    if (!trackProps) return
    return (
      <Track
        key={element.key}
        zIndex={index + 1}
        useNativeDriver={this.props.useNativeDriver}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          transform: [...this.getMarkerAnimation(element, prevElement)]
        }}
        {...this.props}
        {...trackProps}
        markers={undefined}
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
    const {markers, ...props} = this.props
    return (
      <View width="100%" height="1px">
        {markers.length && this.renderTrack()}
        <Track zIndex={0} {...props} />
      </View>
    )
  }
}