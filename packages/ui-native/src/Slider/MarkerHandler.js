import React, {Component} from 'react'
import {Animated} from 'react-native'
import {PanGestureHandler, State} from 'react-native-gesture-handler'

export default class MarkerContainer extends Component {
  static defaultProps = {
    zIndex: 100,
    hitSlop: 15,
    useNativeDriver: true
  }

  state = {
    layout: undefined,
    sliderState: State.UNDETERMINED
  }

  position = new Animated.Value(0)

  get computedPosition() {
    const {bounds} = this.props
    return Animated.diffClamp(this.position, bounds.left, bounds.right)
  }

  constructor(props) {
    super(props)
    this.offset = props.position
    this.position.setOffset(this.offset)
    this.position.addListener(({value}) => {
      const {onSlide, bounds} = this.props
      const {sliderState} = this.state
      if (onSlide && sliderState === State.ACTIVE) {
        onSlide(bounds.clamp(value - this.offset))
      }
    })
    this.onGestureEvent = Animated.event(
      [{nativeEvent: {translationX: this.position}}],
      {useNativeDriver: props.useNativeDriver}
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.sliderState !== State.ACTIVE &&
      (nextProps.position !== this.props.position ||
        nextProps.bounds !== this.props.bounds ||
        nextState.layout !== this.state.layout)
    )
  }

  get hitSlop() {
    const {hitSlop, bounds, position} = this.props
    if (isNaN(hitSlop)) return hitSlop
    return {
      top: hitSlop,
      bottom: hitSlop,
      left: Math.min(Math.abs(position - bounds.left) / 2, hitSlop),
      right: Math.min(bounds.right / 2, hitSlop)
    }
  }

  get handlerStyle() {
    const {zIndex, index} = this.props
    const {layout} = this.state
    if (!layout) return {opacity: 0}
    return {
      position: 'absolute',
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

  onLayout = ({
    nativeEvent: {
      layout: {width, height}
    }
  }) => this.setState({layout: {width, height}})

  onHandlerStateChange = ({nativeEvent}) => {
    const {bounds, onSlide, onSlideStop} = this.props
    if (nativeEvent.oldState === State.ACTIVE) {
      this.offset += nativeEvent.translationX
      const value = bounds.clamp(this.offset)
      if (onSlide) onSlide(value)
      this.setState({sliderState: nativeEvent.state}, () => {
        this.position.setOffset(value)
        this.position.setValue(0)
        if (onSlideStop) onSlideStop()
      })
    } else if (nativeEvent.state !== this.state.sliderState) {
      this.setState({sliderState: nativeEvent.state})
    }
  }

  render() {
    const {children, bounds, useNativeDriver, ...props} = this.props
    delete props.hitSlop
    return (
      <PanGestureHandler
        enabled={bounds.right - bounds.left !== 0}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View
          collapsable={false}
          useNativeDriver={useNativeDriver}
          hitSlop={this.hitSlop}
          onLayout={this.onLayout}
          style={this.handlerStyle}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    )
  }
}
