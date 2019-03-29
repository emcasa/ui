import get from 'lodash/get'
import React, {PureComponent} from 'react'
import {View, Platform} from 'react-native'
import {State} from 'react-native-gesture-handler'
import {withSliderContext} from '@emcasa/ui/lib/components/Slider/Context'
import PanHandler from './PanHandler'

class MarkerHandler extends PureComponent {
  static defaultProps = {
    zIndex: 100
  }

  state = {
    sliderState: State.UNDETERMINED
  }

  static getDerivedStateFromProps(props) {
    const nextState = {}
    if (props.layout) nextState.layout = props.layout
    return nextState
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.bounds !== this.props.bounds &&
      this.state.sliderState !== State.ACTIVE
    ) {
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
    const {index, onSlide, bounds} = this.props
    const {sliderState} = this.state
    if (onSlide && sliderState === State.ACTIVE) {
      onSlide(
        index,
        bounds.clamp(value - Platform.select({android: this.offset, ios: 0}))
      )
    }
  }

  onHandlerStateChange = ({nativeEvent}) => {
    const {bounds, index, onSlide, onSlideStop} = this.props
    if (nativeEvent.oldState === State.ACTIVE) {
      const offset = this.offset + nativeEvent.translationX
      const value = bounds.clamp(offset)
      this.setState({sliderState: nativeEvent.state}, () => {
        this.position.setOffset(offset)
        this.position.setValue(0)
        if (onSlide) onSlide(index, value)
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
    const {
      children,
      useNativeDriver,
      bounds,
      position,
      value,
      index,
      zIndex,
      sliderLayout,
      animatedValue,
      getComputedPosition
    } = this.props
    const {layout} = this.state
    return (
      <PanHandler
        zIndex={zIndex + index}
        bounds={bounds}
        hitSlop={get(children, 'props.hitSlop', 15)}
        layout={layout}
        sliderLayout={sliderLayout}
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
      </PanHandler>
    )
  }
}

export default withSliderContext(({useNativeDriver}) => ({useNativeDriver}))(
  MarkerHandler
)
