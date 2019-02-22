import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import supercluster from 'points-cluster'
import flatten from 'lodash/flatten'
import throttle from 'lodash/throttle'
import isEqual from 'lodash/isEqual'
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

export default class MapContainer extends PureComponent {
  static propTypes = {
    apiKey: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      clusters: [],
      defaultCenter: {lat: -22.9608099, lng: -43.2096142},
      defaultZoom: 8,
      mapOptions: {
        center: {lat: -22.9608099, lng: -43.2096142},
        zoom: 8
      },
      hasAggregators: false,
      loaded: false
    }
  }

  getClusters = () => {
    const {mapOptions} = this.state
    const {markers} = this.props
    const clusters = supercluster(markers, {
      minZoom: 7,
      maxZoom: 17,
      radius: 40
    })

    return clusters(mapOptions)
  }

  createClusters = (bounds) => {
    const {onChange, updateAfterApiCall} = this.props
    const clusters = this.getClusters().map(({wx, wy, numPoints, points}) => ({
      lat: wy,
      lng: wx,
      numPoints,
      id: `${numPoints}_${points[0].id}`,
      points
    }))

    const framedListings = flatten(
      clusters
        .filter((cluster) => cluster.numPoints === 1)
        .map((marker) => [...marker.points])
    )

    if (onChange && !updateAfterApiCall) {
      onChange(framedListings.map((listing) => listing.id), bounds)
    }

    this.setState({
      clusters: this.state.mapOptions.bounds ? clusters : [],
      hasAggregators:
        clusters.reduce(
          (prevVal, elem) => (elem.numPoints > 1 ? prevVal + 1 : prevVal),
          0
        ) > 1
    })
  }

  handleMapChange = ({center, zoom, bounds}) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds
        }
      },
      () => {
        this.createClusters(bounds)
      }
    )
  }

  onChangeListener = throttle(() => {
    const {onChange} = this.props
    const map = this.map
    const swLat = map
      .getBounds()
      .getSouthWest()
      .lat()
    const swLng = map
      .getBounds()
      .getSouthWest()
      .lng()
    const neLat = map
      .getBounds()
      .getNorthEast()
      .lat()
    const neLng = map
      .getBounds()
      .getNorthEast()
      .lng()

    const bounds = {
      sw: {
        lat: swLat,
        lng: swLng
      },
      ne: {
        lat: neLat,
        lng: neLng
      }
    }
    onChange([], bounds)
  }, 500)

  apiIsLoaded = (map, maps, markers) => {
    if (map) {
      this.setState({loaded: true})
      this.map = map
      this.maps = maps

      this.fitMap(markers)

      map.addListener('dragend', () => {
        // log(LISTING_SEARCH_MAP_PAN)
      })
      map.addListener('zoom_changed', () => {
        // log(LISTING_SEARCH_MAP_ZOOM)
      })
    }
  }

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

  componentWillReceiveProps(nextProps) {
    const {markers} = nextProps
    const {markers: prevMarkers} = this.props
    if (!isEqual(markers, prevMarkers)) {
      this.fitMap(markers)
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

  render() {
    const {apiKey, markers, onSelect, highlight} = this.props
    const {
      hasAggregators,
      clusters,
      defaultCenter,
      defaultZoom,
      loaded
    } = this.state

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
        onChange={this.handleMapChange}
        onGoogleApiLoaded={({map, maps}) =>
          this.apiIsLoaded(map, maps, markers)
        }
      >
        {clusters.map((item) => {
          const highlightAggregator =
            highlight &&
            item.points.filter(
              ({lat, lng}) => lat === highlight.lat && lng === highlight.lng
            ).length > 0

          if (item.numPoints === 1) {
            const highlightMarker = isEqual(highlight, {
              lat: item.points[0].lat,
              lng: item.points[0].lng
            })

            if (hasAggregators) {
              return (
                <ClusterMarker
                  key={item.id}
                  lat={item.lat}
                  lng={item.lng}
                  points={item.points}
                  onClick={this.frameMarkers.bind(this)}
                  highlight={highlightAggregator}
                />
              )
            }
            return (
              <MapMarker
                onSelect={onSelect}
                id={item.points[0].id}
                key={item.points[0].id}
                lat={item.points[0].lat}
                lng={item.points[0].lng}
                text={item.points[0].text}
                highlight={highlightMarker}
              />
            )
          }

          return (
            <ClusterMarker
              key={item.id}
              lat={item.lat}
              lng={item.lng}
              points={item.points}
              onClick={this.frameMarkers.bind(this)}
              highlight={highlightAggregator}
            />
          )
        })}
      </GoogleMapReact>
    )
  }
}
