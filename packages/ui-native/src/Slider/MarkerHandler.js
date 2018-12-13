import React, {Component} from 'react'
import {View, Animated, Platform} from 'react-native'
import {PanGestureHandler, State} from 'react-native-gesture-handler'

export default class MarkerHandler extends Component {
  static defaultProps = {
    zIndex: 100,
    hitSlop: 15
  }

  state = {
    layout: undefined,
    sliderState: State.UNDETERMINED
  }

  position = new Animated.Value(0)

  constructor(props) {
    super(props)
    this.offset = props.position
    this.position.setOffset(this.offset)
    this.position.addListener(({value}) => {
      const {onSlide, bounds} = this.props
      const {sliderState} = this.state
      if (onSlide && sliderState === State.ACTIVE) {
        onSlide(
          bounds.clamp(value - Platform.select({android: this.offset, ios: 0}))
        )
      }
    })
    this.onGestureEvent = Animated.event(
      [{nativeEvent: {translationX: this.position}}],
      {useNativeDriver: props.useNativeDriver}
    )
  }

  get computedPosition() {
    const {bounds} = this.props
    const min = bounds.left + 1
    const max = bounds.right - 1
    return this.position.interpolate({
      inputRange: [bounds.left, bounds.right],
      outputRange: [min, max],
      extrapolate: 'clamp'
    })
  }

  componentWillUnmount() {
    this.position.removeAllListeners()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.position !== this.props.position ||
      nextProps.bounds !== this.props.bounds ||
      nextState.layout !== this.state.layout ||
      Object.keys(nextProps.children.props).findIndex(
        (key) =>
          nextProps.children.props[key] !== this.props.children.props[key]
      ) !== -1
    )
  }

  onLayout = ({
    nativeEvent: {
      layout: {width, height}
    }
  }) => this.setState({layout: {width, height}})

  onHandlerStateChange = ({nativeEvent}) => {
    const {bounds, onSlide, onSlideStop} = this.props
    if (nativeEvent.oldState === State.ACTIVE) {
      const offset = this.offset + nativeEvent.translationX
      const value = bounds.clamp(offset)
      this.setState({sliderState: nativeEvent.state}, () => {
        this.offset = value
        this.position.setOffset(offset)
        this.position.setValue(0)
        if (onSlide) onSlide(value)
        if (onSlideStop) onSlideStop()
      })
    } else if (nativeEvent.state !== this.state.sliderState) {
      this.setState({sliderState: nativeEvent.state})
    }
  }

  get hitSlop() {
    const {bounds, hitSlop} = this.props
    if (isNaN(hitSlop)) return hitSlop
    return {
      top: hitSlop,
      bottom: hitSlop,
      left: Math.min(Math.abs(this.offset - bounds.left) / 2, hitSlop),
      right: Math.min(bounds.right / 2, hitSlop)
    }
  }

  get paddingAndroid() {
    const hitSlop = this.hitSlop
    const style = {}
    Object.keys(hitSlop).forEach((key) => {
      style[`padding${key[0].toUpperCase()}${key.slice(1)}`] = hitSlop[key]
    })
    style.marginTop = -hitSlop.top
    style.marginLeft = -hitSlop.left
    return style
  }

  get handlerStyle() {
    const {zIndex, index} = this.props
    const {layout} = this.state
    if (!layout) return {opacity: 0}
    return {
      zIndex: index + zIndex,
      opacity: 1,
      transform: [
        {
          translateX: Animated.add(
            this.computedPosition,
            new Animated.Value(-layout.width / 2)
          )
        }
      ]
    }
  }

  render() {
    const {
      children,
      useNativeDriver,
      bounds,
      position,
      value,
      ...props
    } = this.props
    delete props.hitSlop
    return (
      <PanGestureHandler
        enabled={bounds.right - bounds.left !== 0}
        minDist={0}
        minOffsetX={0}
        activeOffsetX={0}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View
          useNativeDriver={useNativeDriver}
          hitSlop={this.hitSlop}
          style={[
            {position: 'absolute'},
            this.handlerStyle,
            Platform.OS === 'android' && this.paddingAndroid
          ]}
        >
          <View style={{flex: 0}} onLayout={this.onLayout}>
            {React.cloneElement(children, {
              markerState: {position, value, bounds}
            })}
          </View>
        </Animated.View>
      </PanGestureHandler>
    )
  }
}
