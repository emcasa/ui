import get from 'lodash/get'
import curry from 'lodash/curry'
import debounce from 'lodash/debounce'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import Supercluster from 'supercluster'
import * as turf from '@turf/helpers'
import noop from 'lodash/noop'
import MapMarker from './Marker'
import ClusterMarker from './ClusterMarker'
import MultiMarker from './MultiMarker'
import PaginatedMultiMarker from './PaginatedMultiMarker'
import Control from './Control'
import ButtonControl from './ButtonControl'
import SelectControl from './SelectControl'
import {Provider} from './Context'

const Point = ({id, lat, lng, ...props}) => turf.point([lng, lat], props, {id})

const Cluster = curry(
  (
    supercluster,
    {
      id,
      properties,
      geometry: {
        coordinates: [lng, lat]
      }
    }
  ) => {
    const isCluster = properties.cluster
    return {
      lng,
      lat,
      id: `${isCluster ? 'c' : 'p'}.${id}`,
      clusterId: properties.cluster_id,
      points: isCluster
        ? supercluster.getLeaves(id, Infinity).map(({id}) => id)
        : [id]
    }
  }
)

const getClusterPoints = (clusters) =>
  clusters.reduce((markers, cluster) => markers.concat(cluster.points), [])

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

  static ClusterMarker = ClusterMarker

  static MultiMarker = MultiMarker

  static PaginatedMultiMarker = PaginatedMultiMarker

  static propTypes = {
    children: PropTypes.node.isRequired,
    /** Google maps api key */
    apiKey: PropTypes.string,
    /** Google maps libraries to load */
    libraries: PropTypes.array,
    /** Highlighted marker coordinates or getter */
    highlight: PropTypes.oneOfType([PropTypes.func, T.Coordinates]),
    minZoom: PropTypes.number.isRequired,
    maxZoom: PropTypes.number.isRequired,
    defaultZoom: PropTypes.number,
    defaultCenter: T.Coordinates,
    /** Radius to cluster multi markers in pixels. Use 0 to only cluster markers in the same coordinates */
    multiMarkerRadius: PropTypes.number.isRequired,
    /** google-map-react options */
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /** Supercluster options or true/false to enable clustering with the default options */
    cluster: PropTypes.oneOfType([PropTypes.bool, T.SuperClusterOptions]),
    /** Called on map bounds change */
    onChange: PropTypes.func,
    /** Called on map drag end */
    onDragEnd: PropTypes.func,
    /** Called on map zoom change */
    onZoomChange: PropTypes.func,
    /** Called when map element enters or exists full screen mode */
    onFullScreenChange: PropTypes.func,
    /** Called after clicking a map cluster */
    onFrameCluster: PropTypes.func,
    /** Get points to frame when the map is loaded */
    getInitialFrame: PropTypes.func.isRequired,
    /** Modify cluster props */
    getClusterProps: PropTypes.func.isRequired,
    /** Cluster marker component */
    ClusterMarker: PropTypes.elementType,
    /** Multi marker component */
    MultiMarker: PropTypes.elementType
  }

  static defaultProps = {
    ClusterMarker,
    MultiMarker,
    libraries: [],
    defaultCenter: {lat: -22.9608099, lng: -43.2096142},
    minZoom: 7,
    maxZoom: 20,
    multiMarkerRadius: 10,
    highlight: ({lng, lat, id}) => false,
    getClusterProps: (props) => props,
    getInitialFrame: ({clusters, markers}) => clusters,
    get containerRef() {
      return React.createRef()
    }
  }

  state = {
    loaded: false,
    hasAggregators: false,
    markers: {},
    framedMarkers: [],
    clusteredMarkers: [],
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
    if (
      this.props.cluster !== prevProps.cluster ||
      this.state.markers !== prevState.markers
    ) {
      if (this.props.cluster) {
        this.initSupercluster()
      } else {
        this.supercluster = undefined
      }
    }
  }

  getContext() {
    return {
      ...this.state,
      isHighlight: this.isHighlight,
      setMarkerContainer: (id, container) => this.setMarker(id, {container}),
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

  get clusterOptions() {
    const {cluster} = this.props
    const options = typeof cluster === 'object' ? cluster : {}
    return {
      minZoom: 0,
      maxZoom: 17,
      radius: 65,
      ...options
    }
  }

  get multiMarkerEnabled() {
    const {cluster} = this.props
    if (!cluster) return false
    const minZoom = get(cluster, 'maxZoom', 17)
    return this.state.mapOptions.zoom > minZoom
  }

  get supercluster() {
    return this.multiMarkerEnabled
      ? this.multiMarkerSupercluster
      : this.originalSupercluster
  }

  initSupercluster() {
    const {maxZoom, multiMarkerRadius} = this.props
    const {markers} = this.state
    const clusterOptions = this.clusterOptions
    const points = Object.values(markers).map(Point)
    this.originalSupercluster = new Supercluster(clusterOptions)
    this.originalSupercluster.load(points)
    if (clusterOptions.maxZoom < maxZoom) {
      this.multiMarkerSupercluster = new Supercluster({
        ...clusterOptions,
        maxZoom,
        minZoom: clusterOptions.maxZoom,
        radius: multiMarkerRadius
      })
      this.multiMarkerSupercluster.load(points)
    } else {
      this.multiMarkerSupercluster = this.originalSupercluster
    }
  }

  getClusters() {
    const {
      mapOptions: {
        zoom,
        bounds: {nw, se}
      }
    } = this.state
    const x = 0.01
    const bbox = [nw.lng - x, se.lat - x, se.lng + x, nw.lat + x]
    if (!this.supercluster) return []
    const clusters = this.supercluster.getClusters(bbox, zoom)
    return clusters.map(Cluster(this.supercluster))
  }

  updateClusters = async (_clusters) => {
    if (!this.props.cluster) return
    let clusters = _clusters || this.getClusters()
    const framedMarkers = getClusterPoints(clusters)
    if (this.multiMarkerEnabled)
      clusters = clusters.filter((cluster) => cluster.points.length > 1)
    const clusteredMarkers = getClusterPoints(clusters)
    const hasAggregators = Boolean(
      clusters.find((cluster) => cluster.points.length > 1)
    )
    return new Promise((resolve) =>
      this.setState(
        {
          clusters,
          clusteredMarkers,
          framedMarkers,
          hasAggregators
        },
        resolve
      )
    )
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
    ) {
      const fullscreenElement =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement

      onFullScreenChange(e, Boolean(fullscreenElement))
    }
  }

  onMapLoaded = (options) => {
    const {map, maps} = options
    const {
      onMapLoaded,
      onDragEnd,
      onZoomChange,
      getInitialFrame,
      defaultZoom
    } = this.props
    if (onMapLoaded) onMapLoaded(options)
    if (map) {
      this.setState({loaded: true, map, maps}, () => {
        const clusters = this.getClusters()
        this.updateClusters(clusters)
        this.fitMap(
          getInitialFrame({clusters, markers: this.state.markers}),
          defaultZoom
        )
      })
      if (onDragEnd) map.addListener('dragend', onDragEnd)
      if (onZoomChange) map.addListener('zoom_changed', onZoomChange)
    }
  }

  onMapChange = debounce(
    ({center, zoom, bounds}) => {
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
    },
    100,
    {trailing: true, leading: true}
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

  fitMap = (_markers = this.state.markers, _zoom = undefined) => {
    let zoom = _zoom
    let markers = Object.values(_markers).map(
      (m) => new this.maps.LatLng(m.lat, m.lng)
    )
    if (markers.length === 0) {
      const center = this.props.defaultCenter || this.state.mapOptions.center
      this.setCenter(new this.maps.LatLng(center.lat, center.lng))
      if (isNaN(zoom)) zoom = 13
    } else if (markers.length === 1) {
      this.setCenter(markers[0])
      if (isNaN(zoom)) zoom = 15
    } else {
      const bounds = new this.maps.LatLngBounds()
      for (let i = 0, len = markers.length; i < len; i++) {
        bounds.extend(markers[i])
      }
      this.fitBounds(bounds)
    }
    this.setZoom(zoom)
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
    const {options, minZoom, maxZoom} = this.props
    const mapOptions = {
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

  boundsUpdated = async () => {
    const {onChange} = this.props
    const {mapOptions} = this.state
    await this.updateClusters()
    if (onChange) onChange(mapOptions, this.state.framedMarkers)
  }

  getMarker = (id) => {
    return this.state.markers[id]
  }

  isHighlight = (id) => {
    const {highlight} = this.props
    const marker = this.state.markers[id]
    if (!marker) return false
    const {lat, lng} = marker
    if (typeof highlight === 'function') return highlight({id, lat, lng})
    else if (highlight) return highlight.lat == lat && highlight.lng == lng
    else return false
  }

  renderCluster = (cluster) => {
    const {getClusterProps, MultiMarker, ClusterMarker} = this.props
    const isMultiMarker = this.multiMarkerEnabled
    const points = cluster.points.map(this.getMarker)
    const clusterProps = {
      isMultiMarker,
      points,
      key: cluster.id,
      lat: cluster.lat,
      lng: cluster.lng,
      onClick: () => this.frameCluster(points),
      highlight: cluster.points.filter(this.isHighlight)
    }
    const Component = isMultiMarker ? MultiMarker : ClusterMarker
    return <Component {...getClusterProps(clusterProps)} />
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
            defaultZoom={defaultZoom || 8}
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
