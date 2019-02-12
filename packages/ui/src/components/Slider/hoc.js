import throttle from 'lodash/throttle'
import identity from 'lodash/identity'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import interpolate from 'everpolate'
import {Provider} from './Context'

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const getMarkerBounds = (layout, prevMarker) => ({
  left: prevMarker ? prevMarker.position : 0,
  right: layout.width,
  clamp(value) {
    return clamp(value, this.left, this.right)
  }
})

const updateMarkerBounds = ({layout, distance}, marker, prevMarker) => {
  marker.bounds = getMarkerBounds(layout, prevMarker)
  if (prevMarker) {
    marker.bounds.left += distance
    prevMarker.bounds.right = Math.min(marker.position - distance, layout.width)
  }
}

const getLayoutRange = ({width}) => [0, width]

const interpolatePosition = (inputRange, outputRange) => (position) =>
  interpolate.linear(position, inputRange, outputRange)[0]

export default ({
  MarkerHandler,
  Marker,
  SliderTrack,
  getInitialMarkerState = () => ({})
}) => (Target) =>
  class extends PureComponent {
    static displayName = `Slider(${Target.displayName || Target.name})`

    static defaultProps = {
      initialValue: 0,
      minDistance: 1,
      useNativeDriver: true,
      slideEventThrottle: 50,
      ...(Target.defaultProps || {})
    }

    static propTypes = {
      initialValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
        PropTypes.object
      ]).isRequired,
      getMarkerLayout: PropTypes.func,
      minDistance: PropTypes.number.isRequired,
      slideEventThrottle: PropTypes.number.isRequired,
      ...(Target.propTypes || {})
    }

    state = this._getInitialState()

    componentDidUpdate(prevProps) {
      if (
        prevProps.children &&
        this.props.children &&
        prevProps.children.length !== this.props.children.length
      )
        throw new Error('Changing Slider children on the fly is not supported.')
    }

    _getMarkerLayout(data) {
      const {getMarkerLayout} = this.props
      if (getMarkerLayout) return getMarkerLayout(data)
      else if (
        React.isValidElement(data.element) &&
        data.element.type === Marker
      ) {
        const size = data.element.props.size
        return {width: size, height: size}
      }
      return undefined
    }

    _getInitialMarkerValue(key) {
      const {initialValue} = this.props
      if (!isNaN(initialValue)) return initialValue || 0
      if (!(key in initialValue))
        throw new Error(`Undefined initial value for slider marker "${key}".`)
      return initialValue[key]
    }

    _getInitialState() {
      return {
        markers: React.Children.map(
          this.props.children,
          (element, index) =>
            React.isValidElement(element) &&
            React.cloneElement(element, {
              name: element.props.name || index
            })
        ).filter(identity),
        markerStates: undefined,
        layout: undefined
      }
    }

    _getInitialMarkerStates(layout) {
      const {minDistance} = this.props
      const outputRange = this.props.range || [0, layout.width]
      const getPosition = interpolatePosition(
        outputRange,
        getLayoutRange(layout)
      )
      const markers = this._reduceMarkers((state, marker, prevMarker) => {
        const value = clamp(
          this._getInitialMarkerValue(marker.key),
          ...outputRange
        )
        const prevMarkerState = prevMarker ? state[prevMarker.key] : undefined
        const currentMarkerState = {
          value,
          index: marker.index,
          position: getPosition(value),
          layout: this._getMarkerLayout(marker)
        }
        updateMarkerBounds(
          {layout, distance: minDistance},
          currentMarkerState,
          prevMarkerState
        )
        return {
          ...state,
          [marker.key]: {
            ...currentMarkerState,
            ...getInitialMarkerState(currentMarkerState)
          }
        }
      })
      return markers
    }

    _reduceMarkers = (fun, initialValue = {}) => {
      const {markers} = this.state
      let value = initialValue
      let index = 0
      let previous
      markers.forEach((element) => {
        const current = {element, index, key: element.props.name || index}
        value = fun(value, current, previous)
        previous = current
        index++
      })
      return value
    }

    get _getValueFromPosition() {
      if (!this.state.layout || !this.props.range) return identity
      return interpolatePosition(
        getLayoutRange(this.state.layout),
        this.props.range
      )
    }

    _onChangeCallback = () => {
      const {onChange} = this.props
      if (!onChange) return
      const {markerStates} = this.state
      const markerValues = Object.keys(markerStates).reduce(
        (values, key) => ({...values, [key]: markerStates[key].value}),
        {}
      )
      onChange(markerValues)
    }

    onSlide = throttle(
      (key, position) => {
        if (this.state.markerStates[key].position === position) return
        this.setState(
          (state) => ({
            markerStates: {
              ...state.markerStates,
              [key]: {
                ...state.markerStates[key],
                position,
                value: this._getValueFromPosition(position)
              }
            }
          }),
          this._onChangeCallback
        )
      },
      this.props.slideEventThrottle,
      {leading: false, trailing: true}
    )

    // Update marker bounds
    onSlideStop = () => {
      this.onSlide.flush()
      this.setState(({markerStates, layout}) => ({
        markerStates: this._reduceMarkers(
          (result, marker, prevMarker = {}) => {
            result[marker.key] = {...result[marker.key]}
            updateMarkerBounds(
              {layout, distance: this.props.minDistance},
              result[marker.key],
              prevMarker && result[prevMarker.key]
            )
            return result
          },
          {...markerStates}
        )
      }))
    }

    onLayout = (layout) => {
      const markerStates =
        this.state.markerStates || this._getInitialMarkerStates(layout)
      this.setState({layout, markerStates})
    }

    renderMarker = (element) => {
      const key = element.props.name
      return (
        <MarkerHandler
          {...this.state.markerStates[key]}
          key={key}
          name={key}
          useNativeDriver={this.props.useNativeDriver}
          onSlide={this.onSlide}
          onSlideStop={this.onSlideStop}
          sliderLayout={this.state.layout}
        >
          {element}
        </MarkerHandler>
      )
    }

    render() {
      const {trackProps, ...props} = this.props
      const {markers, markerStates} = this.state
      return (
        <Provider value={this.state}>
          <Target onLayout={this.onLayout} {...props}>
            {markerStates && markers.map(this.renderMarker)}
            <SliderTrack
              useNativeDriver={this.props.useNativeDriver}
              trackProps={trackProps}
            />
          </Target>
        </Provider>
      )
    }
  }
