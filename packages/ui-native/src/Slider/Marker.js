import React, {PureComponent} from 'react'
import {Animated} from 'react-native'
import styled from 'styled-components/native'
import {PanGestureHandler, State} from 'react-native-gesture-handler'
import * as slider from '@emcasa/ui/lib/components/Slider'

import View from '../View'

const Marker = styled(View)`
  ${slider.marker};
`

Marker.displayName = 'SliderMarker'

Marker.defaultProps = slider.marker.defaultProps

export default class MarkerContainer extends PureComponent {
  static defaultProps = {
    hitSlop: 15
  }

  offset = 0

  position = new Animated.Value(0)

  onGestureEvent = Animated.event(
    [{nativeEvent: {translationX: this.position}}],
    {useNativeDriver: true}
  )

  constructor(props) {
    super(props)
    this.offset = props.position
    this.position.setOffset(this.offset)
    this.position.addListener(({value}) => {
      const {onSlide, bounds} = this.props
      if (onSlide) onSlide(bounds.clamp(value))
    })
  }

  get hitSlop() {
    const {hitSlop, bounds} = this.props
    if (isNaN(hitSlop)) return hitSlop
    return {
      top: hitSlop,
      bottom: hitSlop,
      left: Math.min(bounds.left / 2, hitSlop),
      right: Math.min(bounds.right / 2, hitSlop)
    }
  }

  onHandlerStateChange = (event) => {
    const {bounds, onSlideStop} = this.props
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.offset += event.nativeEvent.translationX
      this.position.setOffset(bounds.clamp(this.offset))
      this.position.setValue(0)
      if (onSlideStop) onSlideStop()
    }
  }

  render() {
    const {children, bounds, ...props} = this.props
    delete props.hitSlop
    return (
      <PanGestureHandler
        enabled={bounds.right - bounds.left !== 0}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View
          useNativeDriver
          hitSlop={this.hitSlop}
          style={{
            position: 'absolute',
            transform: [
              {
                translateX: Animated.diffClamp(
                  this.position,
                  bounds.left,
                  bounds.right
                )
              }
            ]
          }}
        >
          {children || <Marker {...props} />}
        </Animated.View>
      </PanGestureHandler>
    )
  }
}
