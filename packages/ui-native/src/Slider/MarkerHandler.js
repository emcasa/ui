import React, {PureComponent} from 'react'
import {View, Animated, Platform} from 'react-native'
import {PanGestureHandler, State} from 'react-native-gesture-handler'

class MarkerAnimation extends PureComponent {
  state = {
    position: new Animated.Value(0)
  }

  offset = 0

  constructor(props) {
    super(props)
    this.offset = props.initialPosition
    this.state.position.setOffset(this.offset)
    if (props.onChange) this.state.position.addListener(props.onChange)
    this.onGestureEvent = Animated.event(
      [{nativeEvent: {translationX: this.state.position}}],
      {useNativeDriver: props.useNativeDriver}
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (props.bounds !== state.bounds) {
      const bounds = props.bounds
      const min = bounds.left
      const max = bounds.right
      const computedPosition = state.position.interpolate({
        inputRange: [bounds.left, bounds.right],
        outputRange: [min, max],
        extrapolate: 'clamp'
      })
      return {bounds, computedPosition}
    }
    return null
  }

  componentWillUnmount() {
    this.state.position.removeAllListeners()
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
    const {zIndex, index, layout} = this.props
    if (!layout) return {opacity: 0}
    const offset = -layout.width / 2
    const translateX = Animated.add(
      this.state.computedPosition,
      new Animated.Value(offset)
    )
    return {
      zIndex: index + zIndex,
      opacity: 1,
      transform: [{translateX}]
    }
  }

  render() {
    const {children, ...props} = this.props
    delete props.hitSlop
    delete props.bounds
    delete props.layout
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

export default class MarkerHandler extends PureComponent {
  static defaultProps = {
    zIndex: 100,
    hitSlop: 15
  }

  state = {
    layout: undefined,
    sliderState: State.UNDETERMINED
  }

  animationRef = React.createRef()

  static getDerivedStateFromProps(props, state) {
    const nextState = {}
    if (props.markerLayout) nextState.layout = props.markerLayout
    if (typeof state.initialPosition === 'undefined')
      nextState.initialPosition = props.position
    return nextState
  }

  get offset() {
    return this.animationRef.current.offset
  }

  set offset(value) {
    this.animationRef.current.offset = value
  }

  get position() {
    return this.animationRef.current.state.position
  }

  get computedPosition() {
    return this.animationRef.current.state.computedPosition
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.bounds !== this.props.bounds &&
      this.state.sliderState !== State.ACTIVE
    ) {
      this.offset = this.props.position
      this.position.setOffset(this.props.position)
      this.position.setValue(0)
    }
  }

  onLayout = ({
    nativeEvent: {
      layout: {width, height}
    }
  }) => this.setState({layout: {width, height}})

  onChange = ({value}) => {
    const {name, onSlide, bounds} = this.props
    const {sliderState} = this.state
    if (onSlide && sliderState === State.ACTIVE) {
      onSlide(
        name,
        bounds.clamp(value - Platform.select({android: this.offset, ios: 0}))
      )
    }
  }

  onHandlerStateChange = ({nativeEvent}) => {
    const {bounds, name, onSlide, onSlideStop} = this.props
    if (nativeEvent.oldState === State.ACTIVE) {
      const offset = this.offset + nativeEvent.translationX
      const value = bounds.clamp(offset)
      this.setState({sliderState: nativeEvent.state}, () => {
        this.offset = value
        this.position.setOffset(offset)
        this.position.setValue(0)
        if (onSlide) onSlide(name, value)
        if (onSlideStop) onSlideStop()
      })
    } else if (nativeEvent.state !== this.state.sliderState) {
      this.setState({sliderState: nativeEvent.state})
    }
  }

  render() {
    const {
      children,
      useNativeDriver,
      bounds,
      hitSlop,
      position,
      value,
      markerLayout,
      index,
      zIndex
    } = this.props
    const {layout, initialPosition} = this.state
    return (
      <MarkerAnimation
        ref={this.animationRef}
        zIndex={zIndex}
        index={index}
        bounds={bounds}
        hitSlop={hitSlop}
        initialPosition={initialPosition}
        layout={layout}
        enabled={bounds.right - bounds.left !== 0}
        useNativeDriver={useNativeDriver}
        onChange={this.onChange}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <View
          style={{flex: 0}}
          onLayout={markerLayout ? undefined : this.onLayout}
        >
          {React.cloneElement(children, {
            markerState: {position, value, bounds}
          })}
        </View>
      </MarkerAnimation>
    )
  }
}
