import cond from 'lodash/cond'
import stubTrue from 'lodash/stubTrue'
import constant from 'lodash/constant'
import identity from 'lodash/identity'
import flatten from 'lodash/flatten'
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import supercluster from 'points-cluster'
import noop from 'lodash/noop'
import MapMarker from './Marker'
import ClusterMarker from './ClusterMarker'
import MultiMarker from './MultiMarker'
import Control from './Control'
import ButtonControl from './ButtonControl'
import SelectControl from './SelectControl'
import {Provider} from './Context'

const getOptions = (getDefaultOptions) =>
  cond([
    [isFunction, (fun) => fun(getDefaultOptions())],
    [isObject, (options) => options],
    [stubTrue, getDefaultOptions]
  ])

const getClusterOptions = getOptions(() => ({
  minZoom: 0,
  maxZoom: 17,
  radius: 40
}))

const getClusters = (
  props,
  {markers, mapOptions, clusterOptions: _options}
) => {
  const clusterOptions = {..._options}
  if (
    !isNaN(props.multiMarkerRadius) &&
    mapOptions.zoom > clusterOptions.maxZoom
  )
    Object.assign(clusterOptions, {
      maxZoom: props.maxZoom,
      radius: props.multiMarkerRadius
    })
  const clusters = supercluster(Object.values(markers), clusterOptions)
  return clusters(mapOptions)
}

const getClusterState = (props, state) => {
  if (!state.mapOptions.bounds) return []
  else
    return getClusters(props, state).map(({wx, wy, numPoints, points}) => ({
      lat: wy,
      lng: wx,
      numPoints,
      id: `${numPoints}_${points[0].id}`,
      points
    }))
}

const T = {
  Coordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }),
  SuperClusterOptions: PropTypes.shape({
    minZoom: PropTypes.number.isRequired,
    maxZoom: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired
  })
}

export default class MapContainer extends PureComponent {
  static Marker = MapMarker

  static Control = Control

  static ButtonControl = ButtonControl

  static SelectControl = SelectControl

  static propTypes = {
    children: PropTypes.node.isRequired,
    apiKey: PropTypes.string,
    libraries: PropTypes.array,
    highlight: T.Coordinates,
    isHighlight: PropTypes.func,
    minZoom: PropTypes.number.isRequired,
    maxZoom: PropTypes.number.isRequired,
    defaultZoom: PropTypes.number.isRequired,
    defaultCenter: T.Coordinates.isRequired,
    /** Radius to cluster multi markers in pixels. Use 0 to only cluster markers in the same coordinates */
    multiMarkerRadius: PropTypes.number.isRequired,
    /** google-map-react options */
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /** Enable/disable marker clustering */
    cluster: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      T.SuperClusterOptions
    ]),
    /** Called on map bounds change */
    onChange: PropTypes.func,
    /** Called on map drag end */
    onDragEnd: PropTypes.func,
    /** Called on map zoom change */
    onZoomChanged: PropTypes.func,
    /** Called after clicking a map cluster */
    onFrameCluster: PropTypes.func
  }

  static defaultProps = {
    libraries: [],
    defaultCenter: {lat: -22.9608099, lng: -43.2096142},
    defaultZoom: 8,
    minZoom: 7,
    maxZoom: 20,
    multiMarkerRadius: 0,
    getClusterProps: (props) => props,
    get containerRef() {
      return React.createRef()
    }
  }

  state = {
    loaded: false,
    hasAggregators: false,
    markers: [],
    framedMarkers: [],
    clusters: [],
    clusterOptions: {},
    mapOptions: {
      center: {lat: -22.9608099, lng: -43.2096142},
      zoom: 8
    }
  }

  componentDidMount() {
    document.addEventListener('fullscreenchange', this.onFullScreenChange)
    document.addEventListener('mozfullscreenchange', this.onFullScreenChange)
    document.addEventListener('webkitfullscreenchange', this.onFullScreenChange)
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.onFullScreenChange)
    document.removeEventListener('mozfullscreenchange', this.onFullScreenChange)
    document.removeEventListener(
      'webkitfullscreenchange',
      this.onFullScreenChange
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.markers !== prevState.markers) {
      this.updateClusters()
    }
  }

  getContext() {
    return {
      ...this.state,
      getMarkerHighlight: this.getMarkerHighlight,
      setMarker: this.setMarker,
      unsetMarker: this.unsetMarker
    }
  }

  setMarker = (id, state) =>
    this.setState(({markers}) => ({
      markers: {...markers, [id]: {...(markers[id] || {}), ...state}}
    }))

  unsetMarker = (id) =>
    this.setState(({markers: {...markers}}) => {
      delete markers[id]
      return {markers}
    })

  updateClusters = () => {
    const nextState = {
      clusterOptions: {},
      framedMarkers: [],
      clusters: [],
      hasAggregators: false
    }
    if (!this.props.cluster) return nextState
    nextState.clusterOptions = getClusterOptions(this.props.cluster, this.props)
    nextState.clusters = getClusterState(this.props, {
      ...this.state,
      ...nextState
    })
    nextState.hasAggregators = Boolean(
      nextState.clusters.find((cluster) => cluster.points.length > 1)
    )
    nextState.framedMarkers = nextState.clusters
      .reduce((markers, cluster) => markers.concat(cluster.points), [])
      .map((marker) => marker.id)
    this.setState(nextState)
    return nextState
  }

  get map() {
    return this.state.map
  }

  get maps() {
    return this.state.maps
  }

  onFullScreenChange = (e) => {
    const {containerRef, onFullScreenChange} = this.props
    if (
      onFullScreenChange &&
      containerRef.current &&
      containerRef.current.contains(e.target)
    )
      onFullScreenChange(e)
  }

  onMapLoaded = (options) => {
    const {map, maps} = options
    const {onMapLoaded, onDragEnd, onZoomChanged} = this.props
    if (onMapLoaded) onMapLoaded(options)
    if (map) {
      this.setState({loaded: true, map, maps}, this.fitMap)
      if (onDragEnd) map.addListener('dragend', onDragEnd)
      if (onZoomChanged) map.addListener('zoom_changed', onZoomChanged)
    }
  }

  onMapChange = ({center, zoom, bounds}) =>
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds
        }
      },
      this.boundsUpdated
    )

  panTo(...args) {
    return (this.map ? this.map.panTo : noop).call(this.map, ...args)
  }

  fitBounds(...args) {
    return (this.map ? this.map.fitBounds : noop).call(this.map, ...args)
  }

  setCenter(...args) {
    return (this.map ? this.map.setCenter : noop).call(this.map, ...args)
  }

  setZoom(...args) {
    return (this.map ? this.map.setZoom : noop).call(this.map, ...args)
  }

  fitMap = (markers = this.state.markers) => {
    const LatLngList = Object.values(markers).map(
      (m) => new this.maps.LatLng(m.lat, m.lng)
    )

    const bounds = new this.maps.LatLngBounds()
    for (let i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
      bounds.extend(LatLngList[i])
    }
    this.fitBounds(bounds)

    if (markers.length === 1) {
      this.setZoom(15)
    }

    if (markers.length === 0) {
      const {
        mapOptions: {center}
      } = this.state
      this.setCenter(new this.maps.LatLng(center.lat, center.lng))
      this.setZoom(13)
    }
  }

  frameCluster = (markers) => {
    const {onFrameCluster} = this.props
    const LatLngList = Object.values(markers).map(
      (m) => new this.maps.LatLng(m.lat, m.lng)
    )

    const bounds = new this.maps.LatLngBounds()
    for (let i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
      bounds.extend(LatLngList[i])
    }
    this.fitBounds(bounds)
    if (onFrameCluster) onFrameCluster(bounds, markers)
  }

  createMapOptions = (maps) => {
    const {options, minZoom, maxZoom, defaultZoom, defaultCenter} = this.props
    const mapOptions = {
      defaultZoom,
      defaultCenter,
      maxZoom,
      minZoom,
      zoomControlOptions: {
        position: maps.ControlPosition.RIGHT_TOP,
        style: maps.ZoomControlStyle.SMALL
      },
      mapTypeControl: false
    }
    if (typeof options === 'function') return options(maps, mapOptions)
    return Object.assign(mapOptions, options)
  }

  boundsUpdated() {
    const {onChange} = this.props
    const {mapOptions} = this.state
    const {clusters} = this.updateClusters()
    if (onChange) {
      const framedListings = clusters
        ? flatten(
            clusters
              .filter((cluster) => cluster.numPoints === 1)
              .map((marker) => [...marker.points])
          )
        : []
      onChange(mapOptions, framedListings.map((listing) => listing.id))
    }
  }

  getMarkerHighlight = ({id, lat, lng}) => {
    const {highlight, isHighlight} = this.props
    if (typeof isHighlight === 'function') return isHighlight({id, lat, lng})
    else if (highlight) return highlight.lat == lat && highlight.lng == lng
    else return false
  }

  getClusterHighlight = (cluster) => {
    return cluster.points
      .filter(this.getMarkerHighlight)
      .map((marker) => marker.id)
  }

  renderCluster = (cluster) => {
    const {getClusterProps} = this.props
    const {mapOptions, clusterOptions} = this.state
    const isMultiMarker = mapOptions.zoom > clusterOptions.maxZoom
    const clusterProps = {
      isMultiMarker,
      key: cluster.id,
      lat: cluster.lat,
      lng: cluster.lng,
      points: cluster.points,
      onClick: this.frameCluster,
      highlight: this.getClusterHighlight(cluster)
    }
    const Component = isMultiMarker ? MultiMarker : ClusterMarker
    return <Component cluster={false} {...getClusterProps(clusterProps)} />
  }

  render() {
    const {
      children,
      id,
      style,
      className,
      containerRef,
      apiKey,
      libraries,
      defaultCenter,
      defaultZoom
    } = this.props
    const {hasAggregators, clusters} = this.state

    return (
      <div
        id={id}
        style={Object.assign({width: '100%', height: '100%'}, style)}
        className={className}
        ref={containerRef}
      >
        <Provider value={this.getContext()}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: apiKey,
              libraries: libraries.join(','),
              language: 'pt-BR',
              region: 'br'
            }}
            defaultZoom={defaultZoom}
            defaultCenter={defaultCenter}
            options={this.createMapOptions}
            yesIWantToUseGoogleMapApiInternals
            onChange={this.onMapChange}
            onGoogleApiLoaded={this.onMapLoaded}
          >
            {children}
            {hasAggregators && clusters.map(this.renderCluster)}
          </GoogleMapReact>
        </Provider>
      </div>
    )
  }
}
