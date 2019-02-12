import React, {PureComponent} from 'react'
import {View, Animated, Platform} from 'react-native'
import {PanGestureHandler, State} from 'react-native-gesture-handler'
import {withSliderContext} from '@emcasa/ui/lib/components/Slider/Context'

const getHandlerStyle = ({zIndex, index, ...props}, {layout}) => {
  if (!layout) return {opacity: 0}
  const offset = -layout.width / 2
  const translateX = Animated.add(
    props.getComputedPosition(),
    new Animated.Value(offset)
  )
  return {
    zIndex: index + zIndex,
    opacity: 1,
    transform: [{translateX}]
  }
}

const getPaddingAndroid = ({hitSlop}) => {
  const style = {}
  Object.keys(hitSlop).forEach((key) => {
    style[`padding${key[0].toUpperCase()}${key.slice(1)}`] = hitSlop[key]
  })
  style.marginTop = -hitSlop.top
  style.marginLeft = -hitSlop.left
  return style
}

const getStyles = (props, state) => [
  {position: 'absolute'},
  getHandlerStyle(props, state),
  Platform.OS === 'android' ? getPaddingAndroid(props, state) : undefined
]

const getHitSlop = ({bounds, hitSlop, animatedValue}) => {
  if (isNaN(hitSlop)) return hitSlop
  return {
    top: hitSlop,
    bottom: hitSlop,
    left: Math.min(Math.abs(animatedValue._offset - bounds.left) / 2, hitSlop),
    right: Math.min(bounds.right / 2, hitSlop)
  }
}

class MarkerHandler extends PureComponent {
  static defaultProps = {
    zIndex: 100,
    hitSlop: 15
  }

  state = this._getInitialState()

  constructor(props) {
    super(props)
    props.animatedValue.addListener(this.onChange)
    this.onGestureEvent = Animated.event(
      [{nativeEvent: {translationX: props.animatedValue}}],
      {useNativeDriver: props.useNativeDriver}
    )
  }

  static getDerivedStateFromProps(props) {
    const nextState = {}
    if (props.layout) nextState.layout = props.layout
    return nextState
  }

  _getInitialState() {
    const state = {
      hitSlop: getHitSlop(this.props),
      layout: this.props.layout,
      sliderState: State.UNDETERMINED
    }
    state.styles = getStyles(this.props, state)
    return state
  }

  componentWillUnmount() {
    this.props.animatedValue.removeAllListeners()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.bounds !== this.props.bounds &&
      this.state.sliderState !== State.ACTIVE
    ) {
      this.position.setOffset(this.props.position)
      this.position.setValue(0)
    } else if (prevState.layout == this.state.layout) return
    this.setState({
      styles: getStyles(this.props, this.state)
    })
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
        this.position.setOffset(offset)
        this.position.setValue(0)
        if (onSlide) onSlide(name, value)
        if (onSlideStop) onSlideStop()
      })
    } else if (nativeEvent.state !== this.state.sliderState) {
      this.setState({sliderState: nativeEvent.state})
    }
  }

  get offset() {
    return this.props.animatedValue._offset
  }

  get position() {
    return this.props.animatedValue
  }

  render() {
    const {children, useNativeDriver, bounds, position, value} = this.props
    const {styles, hitSlop} = this.state
    return (
      <PanGestureHandler
        minDist={0}
        minOffsetX={0}
        activeOffsetX={0}
        enabled={bounds.right - bounds.left !== 0}
        useNativeDriver={useNativeDriver}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
      >
        <Animated.View
          useNativeDriver={useNativeDriver}
          hitSlop={hitSlop}
          style={styles}
        >
          <View
            style={{flex: 0}}
            onLayout={this.props.layout ? undefined : this.onLayout}
          >
            {React.cloneElement(children, {
              markerState: {position, value, bounds}
            })}
          </View>
        </Animated.View>
      </PanGestureHandler>
    )
  }
}

export default withSliderContext(({useNativeDriver}) => ({useNativeDriver}))(
  MarkerHandler
)
