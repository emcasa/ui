import React, {Component} from 'react'
import {Animated} from 'react-native'
import {PanGestureHandler, State} from 'react-native-gesture-handler'

export default class MarkerContainer extends Component {
  static defaultProps = {
    zIndex: 100,
    hitSlop: 15
  }

  state = {
    bounds: undefined,
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
        onSlide(bounds.clamp(value - this.offset))
      }
    })
    this.onGestureEvent = Animated.event(
      [{nativeEvent: {translationX: this.position}}],
      {useNativeDriver: props.useNativeDriver}
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (state.sliderState !== State.ACTIVE) return {bounds: props.bounds}
    else return null
  }

  get computedPosition() {
    const {bounds} = this.state
    return Animated.diffClamp(this.position, bounds.left, bounds.right)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.state.sliderState !== State.ACTIVE &&
        (nextProps.position !== this.props.position ||
          nextState.bounds !== this.state.bounds ||
          nextState.layout !== this.state.layout)) ||
      Object.keys(nextProps.children.props).findIndex(
        (key) =>
          nextProps.children.props[key] !== this.props.children.props[key]
      ) !== -1
    )
  }

  get hitSlop() {
    const {hitSlop} = this.props
    const {bounds} = this.state
    if (isNaN(hitSlop)) return hitSlop
    return {
      top: hitSlop,
      bottom: hitSlop,
      left: Math.min(Math.abs(this.offset - bounds.left) / 2, hitSlop),
      right: Math.min(bounds.right / 2, hitSlop)
    }
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

  onLayout = ({
    nativeEvent: {
      layout: {width, height}
    }
  }) => this.setState({layout: {width, height}})

  onHandlerStateChange = ({nativeEvent}) => {
    const {onSlide, onSlideStop} = this.props
    const {bounds} = this.state
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
    const {children, useNativeDriver, ...props} = this.props
    const {bounds} = this.state
    delete props.hitSlop
    return (
      <PanGestureHandler
        enabled={bounds.right - bounds.left !== 0}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View
          useNativeDriver={useNativeDriver}
          hitSlop={this.hitSlop}
          style={[{position: 'absolute'}, this.handlerStyle]}
        >
          {React.cloneElement(children, {onLayout: this.onLayout})}
        </Animated.View>
      </PanGestureHandler>
    )
  }
}
