import React, {Component} from 'react'
import {Animated, Platform} from 'react-native'
import {PanGestureHandler} from 'react-native-gesture-handler'

export default class MarkerPanHandler extends Component {
  constructor(props) {
    super(props)
    if (props.onChange) this.props.animatedValue.addListener(props.onChange)
    this.onGestureEvent = Animated.event(
      [{nativeEvent: {translationX: this.props.animatedValue}}],
      {useNativeDriver: props.useNativeDriver}
    )
  }

  componentWillUnmount() {
    this.props.animatedValue.removeAllListeners()
  }

  get hitSlop() {
    const {bounds, hitSlop} = this.props
    if (isNaN(hitSlop)) return hitSlop
    return {
      top: hitSlop,
      bottom: hitSlop,
      left: Math.min(bounds.left / 2, hitSlop),
      right: Math.min(bounds.right / 2, hitSlop)
    }
  }

  get paddingAndroid() {
    const hitSlop = this.hitSlop
    const style = {}
    if (hitSlop) {
      Object.keys(hitSlop).forEach((key) => {
        style[`padding${key[0].toUpperCase()}${key.slice(1)}`] = hitSlop[key]
      })
      style.marginTop = -hitSlop.top
      style.marginLeft = -hitSlop.left
    }
    return style
  }

  get handlerStyle() {
    const {zIndex, layout} = this.props
    if (!layout) return {opacity: 0}
    const offset = -layout.width / 2
    const translateX = Animated.add(
      this.props.getComputedPosition(),
      new Animated.Value(offset)
    )
    return {
      zIndex: zIndex,
      opacity: 1,
      transform: [{translateX}]
    }
  }

  render() {
    const {children, ...props} = this.props
    delete props.hitSlop
    delete props.bounds
    delete props.layout
    delete props.getComputedPosition
    return (
      <PanGestureHandler
        minDist={0}
        minOffsetX={0}
        activeOffsetX={0}
        onGestureEvent={this.onGestureEvent}
        {...props}
      >
        <Animated.View
          useNativeDriver={props.useNativeDriver}
          hitSlop={this.hitSlop}
          style={[
            {position: 'absolute'},
            this.handlerStyle,
            Platform.OS === 'android' && this.paddingAndroid
          ]}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    )
  }
}
