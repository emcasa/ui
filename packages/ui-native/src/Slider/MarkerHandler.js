import React, {PureComponent} from 'react'
import {View, Animated, Platform} from 'react-native'
import {PanGestureHandler, State} from 'react-native-gesture-handler'

class MarkerAnimation extends PureComponent {

  offset = 0

  constructor(props) {
    super(props)
    this.offset = props.initialPosition
    this.props.animatedValue.setOffset(this.offset)
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
      this.props.getComputedPosition(),
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
    if (props.layout) nextState.layout = props.layout
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
    return this.props.animatedValue
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
      index,
      zIndex,
      animatedValue,
      getComputedPosition
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
        getComputedPosition={getComputedPosition}
        animatedValue={animatedValue}
      >
        <View
          style={{flex: 0}}
          onLayout={this.props.layout ? undefined : this.onLayout}
        >
          {React.cloneElement(children, {
            markerState: {position, value, bounds}
          })}
        </View>
      </MarkerAnimation>
    )
  }
}
