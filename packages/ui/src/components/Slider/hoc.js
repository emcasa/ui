import throttle from 'lodash/throttle'
import identity from 'lodash/identity'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import interpolate from 'everpolate'
import {Provider} from './Context'

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const getMarkerBounds = (outputRange, prevMarker) => ({
  left: prevMarker ? prevMarker.position : 0,
  right: outputRange[1],
  clamp(value) {
    return clamp(value, this.left, this.right)
  }
})

const updateMarkerBounds = (outputRange, marker, prevMarker) => {
  marker.bounds = getMarkerBounds(outputRange, prevMarker)
  if (prevMarker) {
    prevMarker.bounds.right = Math.min(marker.position, outputRange[1])
  }
}

const interpolatePosition = (inputRange, outputRange) => (position) =>
  interpolate.linear(position, inputRange, outputRange)[0]

export default ({
  MarkerHandler,
  Marker,
  SliderTrack,
  getDerivedState,
  getInitialMarkerState = () => ({})
}) => (Target) =>
  class extends PureComponent {
    static displayName = `Slider(${Target.displayName || Target.name})`

    static defaultProps = {
      initialValue: 0,
      minDistance: 1,
      slideEventThrottle: 50,
      layoutEventThrottle: 50,
      ...(Target.defaultProps || {})
    }

    static propTypes = {
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      initialValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
        PropTypes.object
      ]).isRequired,
      getMarkerLayout: PropTypes.func,
      minDistance: PropTypes.number.isRequired,
      slideEventThrottle: PropTypes.number.isRequired,
      layoutEventThrottle: PropTypes.number.isRequired,
      ...(Target.propTypes || {})
    }

    state = this._getInitialState()

    static getDerivedStateFromProps = getDerivedState

    componentDidUpdate(prevProps, prevState) {
      if (
        prevProps.children &&
        this.props.children &&
        prevProps.children.length !== this.props.children.length
      )
        throw new Error('Changing Slider children on the fly is not supported.')
      if (
        prevState.layout &&
        prevState.layout.width !== this.state.layout.width
      )
        this._updateBounds()
    }

    _getInitialState() {
      const {width} = this.props
      const layout = Number(width) === width ? {width} : undefined
      const markers = layout ? this._getInitialMarkerState(layout) : undefined
      return {layout, markers}
    }

    _getInitialMarkerState(layout) {
      const {initialValue} = this.props
      const outputRange = this.props.range || [0, 1]
      const layoutRange = [0, layout.width]
      const getPosition = interpolatePosition(outputRange, layoutRange)
      const getInitialValue = (key) => {
        if (!isNaN(initialValue)) return initialValue || 0
        if (!(key in initialValue))
          throw new Error(`Undefined initial value for slider marker "${key}".`)
        return initialValue[key]
      }
      const markers = []
      React.Children.forEach(this.props.children, (element, index) => {
        if (!React.isValidElement(element)) return
        const key = element.props.name || index
        const value = clamp(getInitialValue(key), ...outputRange)
        const state = {
          value,
          position: getPosition(value),
          layout: this._getMarkerLayout({index, key, element})
        }
        updateMarkerBounds(
          layoutRange,
          state,
          index > 0 ? markers[index - 1].state : undefined
        )
        Object.assign(state, getInitialMarkerState(state))
        const marker = {
          key,
          index,
          element,
          state
        }
        markers.push(marker)
      })
      return markers
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

    get _getValueFromPosition() {
      if (!this.state.layout || !this.props.range) return identity
      return interpolatePosition([0, this.state.layout.width], this.props.range)
    }

    get _getPositionFromValue() {
      if (!this.state.layout || !this.props.range) return identity
      return interpolatePosition(this.props.range, [0, this.state.layout.width])
    }

    _onChangeCallback = () => {
      const {onChange} = this.props
      if (!onChange) return
      const {markers} = this.state
      const markerValues = markers.reduce(
        (values, {key, state}) => ({...values, [key]: state.value}),
        {}
      )
      onChange(markerValues)
    }

    _updateBounds = () => {
      this.setState(({markers, layout}) => ({
        markers: markers.reduce((result, marker, index) => {
          const nextMarker = {
            ...marker,
            state: {
              ...marker.state,
              position: this._getPositionFromValue(marker.state.value)
            }
          }
          updateMarkerBounds(
            [0, layout.width],
            nextMarker.state,
            index > 0 ? result[index - 1].state : undefined
          )
          result.push(nextMarker)
          return result
        }, [])
      }))
    }

    onSlide = throttle(
      (index, position) => {
        if (this.state.markers[index].position === position) return
        this.setState(({markers}) => {
          const nextMarkers = [...markers]
          nextMarkers[index] = {
            ...markers[index],
            state: {
              ...markers[index].state,
              position,
              value: this._getValueFromPosition(position)
            }
          }
          return {markers: nextMarkers}
        }, this._onChangeCallback)
      },
      this.props.slideEventThrottle,
      {leading: false, trailing: true}
    )

    onSlideStop = () => {
      this.onSlide.flush()
      this._updateBounds()
    }

    onLayout = throttle(
      (layout) => {
        const markers =
          this.state.markers || this._getInitialMarkerState(layout)
        this.setState({layout, markers})
      },
      this.props.layoutEventThrottle,
      {leading: true, trailing: true}
    )

    renderMarker = ({key, index, element, state}) => {
      return (
        <MarkerHandler
          {...state}
          key={key}
          index={index}
          name={key}
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
      const {markers} = this.state
      return (
        <Provider value={this.state}>
          <Target onLayout={this.onLayout} {...props}>
            {markers && markers.map(this.renderMarker)}
            <SliderTrack trackProps={trackProps} />
          </Target>
        </Provider>
      )
    }
  }
