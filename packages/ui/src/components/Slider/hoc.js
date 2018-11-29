import React, {PureComponent} from 'react'
import interpolate from 'interpolate-range'

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const getMarkerBounds = (prevMarker, layout) => ({
  left: prevMarker ? prevMarker.position : 0,
  right: layout.width,
  clamp(value) {
    return clamp(value, this.left, this.right)
  }
})

export default (Target) =>
  class extends PureComponent {
    static displayName = `Slider(${Target.displayName || Target.name})`

    state = {
      markers: undefined,
      layout: undefined
    }

    _getInitialMarkerState(layout) {
      const {initialValue} = this.props
      const outputRange = this.props.range || [0, layout.width]
      const markers = this._reduceMarkers((state, marker, prevMarker) => {
        const value = clamp(initialValue[marker.key], ...outputRange)
        const prevMarkerState = prevMarker ? state[prevMarker.key] : undefined
        const currentMarkerState = {
          value,
          index: marker.index,
          bounds: getMarkerBounds(prevMarkerState, layout),
          position: this._getPositionFromValue(value, layout)
        }
        if (prevMarker)
          prevMarkerState.bounds.right = currentMarkerState.position
        return {...state, [marker.key]: currentMarkerState}
      })
      return markers
    }

    _reduceMarkers = (fun, initialValue = {}) => {
      const {children} = this.props
      let value = initialValue
      let index = 0
      let previous
      React.Children.forEach(children, (element) => {
        const current = {element, index, key: element.props.name || index}
        value = fun(value, current, previous)
        previous = current
        index++
      })
      return value
    }

    _interpolate = (swap = false) => (position, layout = this.state.layout) => {
      let outputRange = this.props.range
      if (outputRange && layout) {
        let inputRange = [0, layout.width]
        if (swap) inputRange = [outputRange, (outputRange = inputRange)][0]
        return interpolate({inputRange, outputRange})(position)
      } else {
        return position
      }
    }

    _getValueFromPosition = this._interpolate()

    _getPositionFromValue = this._interpolate(true)

    _onChangeCallback = () => {
      const {onChange} = this.props
      if (!onChange) return
      const {markers} = this.state
      const markerValues = Object.keys(markers).reduce(
        (values, key) => ({...values, [key]: markers[key].value}),
        {}
      )
      onChange(markerValues)
    }

    onSlide = (marker) => (position) => {
      this.setState(
        (state) => ({
          markers: {
            ...state.markers,
            [marker.key]: {
              ...state.markers[marker.key],
              position,
              value: this._getValueFromPosition(position)
            }
          }
        }),
        this._onChangeCallback
      )
    }

    // Update marker bounds
    onSlideStop = () =>
      this.setState(({markers, layout}) => ({
        markers: this._reduceMarkers(
          (result, marker, prevMarker = {}) => {
            const bounds = getMarkerBounds(result[prevMarker.key], layout)
            result[marker.key] = {...result[marker.key], bounds}
            if (prevMarker.key)
              result[prevMarker.key].bounds.right = result[marker.key].position
            return result
          },
          {...markers}
        )
      }))

    onLayout = (layout) => {
      const markers = this.state.markers || this._getInitialMarkerState(layout)
      this.setState({layout, markers})
    }

    renderMarker = (element, index) => {
      const key = element.props.name || index
      return React.cloneElement(element, {
        ...this.state.markers[key],
        onSlide: this.onSlide({key, index}),
        onSlideStop: this.onSlideStop,
        sliderLayout: this.state.layout
      })
    }

    render() {
      const {children, ...props} = this.props
      const {markers} = this.state
      return (
        <Target onLayout={this.onLayout} {...props}>
          {Boolean(markers) && React.Children.map(children, this.renderMarker)}
        </Target>
      )
    }
  }
