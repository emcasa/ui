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

const getMarkers = ({children}) => {
  return React.Children.map(
    children,
    (node) =>
      React.isValidElement(node) && {
        node,
        id: node.props.id,
        lat: node.props.lat,
        lng: node.props.lng
      }
  ).filter(Boolean)
}

const getOptions = (getDefaultOptions) =>
  cond([
    [isFunction, identity],
    [isObject, constant],
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
  const clusters = supercluster(markers, clusterOptions)
  return clusters(mapOptions)
}

const getClusterProps = (props, state) => {
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
    multiMarkerRadius: 0
  }

  state = {
    markers: undefined,
    clusters: undefined,
    mapOptions: {
      center: {lat: -22.9608099, lng: -43.2096142},
      zoom: 8
    },
    hasAggregators: false,
    loaded: false
  }

  static getDerivedStateFromProps(props, state) {
    let {markers, clusters, clusterOptions, hasAggregators} = state
    const shouldUpdateMarkers =
      state.children !== props.children || !state.markers
    if (shouldUpdateMarkers) markers = getMarkers(props, state)
    if (props.cluster && (shouldUpdateMarkers || !state.clusters)) {
      clusterOptions = getClusterOptions(props.cluster, props)
      clusters = getClusterProps(props, {...state, markers, clusterOptions})
      hasAggregators =
        clusters.reduce(
          (prevVal, elem) => (elem.numPoints > 1 ? prevVal + 1 : prevVal),
          0
        ) >= 1
    }
    return {
      children: props.children,
      markers,
      clusters,
      clusterOptions,
      hasAggregators
    }
  }

  onMapLoaded = ({map, maps}) => {
    if (map) {
      const {onDragEnd, onZoomChanged} = this.props
      this.setState({loaded: true})
      this.map = map
      this.maps = maps
      this.fitMap(this.state.markers)
      if (onDragEnd) map.addListener('dragend', onDragEnd)
      if (onZoomChanged) map.addListener('zoom_changed', onZoomChanged)
    }
  }

  onMapChange = ({center, zoom, bounds}) =>
    this.setState(
      {
        clusters: undefined,
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
    const LatLngList = markers.map((m) => new this.maps.LatLng(m.lat, m.lng))

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
    const LatLngList = markers.map((m) => new this.maps.LatLng(m.lat, m.lng))

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
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT
      },
      mapTypeControl: true
    }
    if (typeof options === 'function') return options(maps, mapOptions)
    return Object.assign(mapOptions, options)
  }

  boundsUpdated() {
    const {onChange} = this.props
    const {mapOptions, clusters} = this.state
    if (onChange) {
      const framedListings = clusters
        ? flatten(
            clusters
              .filter((cluster) => cluster.numPoints === 1)
              .map((marker) => [...marker.points])
          )
        : []
      onChange(mapOptions.bounds, framedListings.map((listing) => listing.id))
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
    const {mapOptions, clusterOptions} = this.state
    const clusterProps = {
      key: cluster.id,
      lat: cluster.lat,
      lng: cluster.lng,
      points: cluster.points,
      onClick: this.frameCluster,
      highlight: this.getClusterHighlight(cluster)
    }
    const Component =
      mapOptions.zoom > clusterOptions.maxZoom ? MultiMarker : ClusterMarker
    return <Component {...clusterProps} />
  }

  renderClusterMarkers = (item) => {
    return item.points.map((marker) =>
      React.cloneElement(marker.node, {
        highlight: this.getMarkerHighlight(marker)
      })
    )
  }

  render() {
    const {
      children,
      cluster: shouldCluster,
      apiKey,
      libraries,
      defaultCenter,
      defaultZoom
    } = this.props
    const {hasAggregators, clusters} = this.state

    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: apiKey,
          libraries,
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
        {!shouldCluster
          ? children
          : clusters.map(
              hasAggregators ? this.renderCluster : this.renderClusterMarkers
            )}
      </GoogleMapReact>
    )
  }
}
