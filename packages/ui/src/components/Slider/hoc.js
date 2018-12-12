import React, {PureComponent} from 'react'
import interpolate from 'interpolate-range'

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const getMarkerBounds = (layout, prevMarker) => ({
  left: prevMarker ? prevMarker.position : 0.01,
  right: layout.width - 0.01,
  clamp(value) {
    return clamp(value, this.left, this.right)
  }
})

const updateMarkerBounds = ({layout, distance}, marker, prevMarker) => {
  marker.bounds = getMarkerBounds(layout, prevMarker)
  if (prevMarker) {
    marker.bounds.left += distance
    prevMarker.bounds.right = marker.position + distance
  }
}

export default ({MarkerHandler, SliderTrack}) => (Target) =>
  class extends PureComponent {
    static displayName = `Slider(${Target.displayName || Target.name})`

    static defaultProps = {
      initialValue: 0,
      minDistance: 1,
      trackProps: {},
      useNativeDriver: true
    }

    state = {
      markers: undefined,
      layout: undefined
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps.children &&
        this.props.children &&
        prevProps.children.length !== this.props.children.length
      )
        throw new Error('Changing Slider children on the fly is not supported.')
    }

    _getInitialMarkerValue(key) {
      const {initialValue} = this.props
      if (!isNaN(initialValue)) return initialValue || 0
      if (!(key in initialValue))
        throw new Error(`Undefined initial value for slider marker "${key}".`)
      return initialValue[key]
    }

    _getInitialMarkerState(layout) {
      const {minDistance} = this.props
      const outputRange = this.props.range || [0, layout.width]
      const markers = this._reduceMarkers((state, marker, prevMarker) => {
        const value = clamp(
          this._getInitialMarkerValue(marker.key),
          ...outputRange
        )
        const prevMarkerState = prevMarker ? state[prevMarker.key] : undefined
        const currentMarkerState = {
          value,
          index: marker.index,
          ref: React.createRef(),
          position: this._getPositionFromValue(value, layout)
        }
        updateMarkerBounds(
          {layout, distance: minDistance},
          currentMarkerState,
          prevMarkerState
        )
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
            result[marker.key] = {...result[marker.key]}
            updateMarkerBounds(
              {layout, distance: this.props.minDistance},
              result[marker.key],
              prevMarker && result[prevMarker.key]
            )
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
      if (!element) return
      const key = element.props.name || index
      return (
        <MarkerHandler
          {...this.state.markers[key]}
          key={key}
          name={key}
          trackProps={element.props.trackProps}
          useNativeDriver={this.props.useNativeDriver}
          onSlide={this.onSlide({key, index})}
          onSlideStop={this.onSlideStop}
          sliderLayout={this.state.layout}
        >
          {element}
        </MarkerHandler>
      )
    }

    render() {
      const {children, trackProps, ...props} = this.props
      const {markers, layout} = this.state
      const markerContainers =
        Boolean(markers) && React.Children.map(children, this.renderMarker)
      return (
        <Target onLayout={this.onLayout} {...props}>
          {markerContainers}
          <SliderTrack
            markers={markerContainers}
            sliderLayout={layout}
            useNativeDriver={this.props.useNativeDriver}
            {...trackProps}
          />
        </Target>
      )
    }
  }
