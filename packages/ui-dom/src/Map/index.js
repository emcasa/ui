import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import supercluster from 'points-cluster'
import flatten from 'lodash/flatten'
import throttle from 'lodash/throttle'
import isEqual from 'lodash/isEqual'
import isObject from 'lodash/isObject'
import MapMarker from './Marker'
import ClusterMarker from './ClusterMarker'

function createMapOptions(maps) {
  return {
    defaultZoom: 8,
    defaultCenter: {lat: -22.9608099, lng: -43.2096142},
    maxZoom: 20,
    minZoom: 7,
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_TOP,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  }
}

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

const defaultClusterOptions = {
  minZoom: 7,
  maxZoom: 17,
  radius: 40
}

const getClusters = ({cluster}, {markers, mapOptions}) => {
  const clusters = supercluster(
    markers,
    isObject(cluster) ? cluster : defaultClusterOptions
  )
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

  //const framedListings = flatten(
  //  clusters
  //    .filter((cluster) => cluster.numPoints === 1)
  //    .map((marker) => [...marker.points])
  //)

  //if (onChange && !updateAfterApiCall) {
  //  onChange(framedListings.map((listing) => listing.id), bounds)
  //}

  //return
  //this.setState({
  //  clusters: this.state.mapOptions.bounds ? clusters : [],
  //  hasAggregators:
  //    clusters.reduce(
  //      (prevVal, elem) => (elem.numPoints > 1 ? prevVal + 1 : prevVal),
  //      0
  //    ) > 1
  //})
}

export default class MapContainer extends PureComponent {
  static Marker = MapMarker

  static propTypes = {
    apiKey: PropTypes.string
  }

  static defaultProps = {
    defaultCenter: {lat: -22.9608099, lng: -43.2096142},
    defaultZoom: 8
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
    let {markers, clusters, hasAggregators} = state
    const shouldUpdateMarkers =
      state.children !== props.children || !state.markers
    if (shouldUpdateMarkers) markers = getMarkers(props, state)
    if (shouldUpdateMarkers || !state.clusters) {
      clusters = getClusterProps(props, {...state, markers})
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
      hasAggregators
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {markers} = this.state
    const {markers: prevMarkers} = prevState
    if (this.map && !isEqual(markers, prevMarkers)) {
      this.fitMap(markers)
    }
  }

  onMapLoaded = ({map, maps}) => {
    if (map) {
      this.setState({loaded: true})
      this.map = map
      this.maps = maps

      this.fitMap(this.state.markers)

      map.addListener('dragend', () => {
        // log(LISTING_SEARCH_MAP_PAN)
      })
      map.addListener('zoom_changed', () => {
        // log(LISTING_SEARCH_MAP_ZOOM)
      })
    }
  }

  onMapChange = ({center, zoom, bounds}) =>
    this.setState({
      clusters: undefined,
      mapOptions: {
        center,
        zoom,
        bounds
      }
    })

  fitMap = (markers) => {
    const LatLngList = markers.map((m) => new this.maps.LatLng(m.lat, m.lng))

    const bounds = new this.maps.LatLngBounds()
    for (let i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
      bounds.extend(LatLngList[i])
    }
    this.map.fitBounds(bounds)

    if (markers.length === 1) {
      this.map.setZoom(15)
    }

    if (markers.length === 0) {
      const {
        mapOptions: {center}
      } = this.state
      this.map.setCenter(new this.maps.LatLng(center.lat, center.lng))
      this.map.setZoom(13)
    }
  }

  frameMarkers(markers) {
    // log(LISTING_SEARCH_MAP_CLUSTER)
    const LatLngList = markers.map((m) => new this.maps.LatLng(m.lat, m.lng))

    const bounds = new this.maps.LatLngBounds()
    for (let i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
      bounds.extend(LatLngList[i])
    }
    this.map.fitBounds(bounds)
  }

  resetMapView = () => {
    const {
      mapOptions: {center}
    } = this.state
    this.map.setCenter(new this.maps.LatLng(center.lat, center.lng))
    this.map.setZoom(13)
  }

  isMarkerHighlighted = ({lat, lng}) => {
    const {highlight} = this.props
    return highlight && isEqual(highlight, {lat, lng})
  }

  isClusterHighlighted = (cluster) => {
    const {highlight} = this.props
    return (
      highlight &&
      cluster.points.filter(
        ({lat, lng}) => lat === highlight.lat && lng === highlight.lng
      ).length > 0
    )
  }

  renderCluster = (cluster) => {
    return (
      <ClusterMarker
        key={cluster.id}
        lat={cluster.lat}
        lng={cluster.lng}
        points={cluster.points}
        onClick={this.frameMarkers.bind(this)}
        highlight={this.isClusterHighlighted(cluster)}
      />
    )
  }

  renderClusterMarkers = (item) => {
    return item.points.map((marker) =>
      React.cloneElement(marker.node, {
        highlight: this.isMarkerHighlighted(marker)
      })
    )
  }

  render() {
    const {
      children,
      cluster: shouldCluster,
      apiKey,
      defaultCenter,
      defaultZoom
    } = this.props
    const {hasAggregators, clusters} = this.state

    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: apiKey,
          language: 'pt-BR',
          region: 'br'
        }}
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        options={createMapOptions}
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
