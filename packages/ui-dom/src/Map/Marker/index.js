import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Container from './styles'
import {withMapContext} from '../Context'

export function MarkerContainer({
  id,
  className,
  style,
  lat,
  lng,
  highlight,
  children,
  onSelect,
  onClick = onSelect ? () => onSelect(id, {lat, lng}) : undefined,
  onMouseEnter = onSelect ? () => onSelect(id, {lat, lng}) : undefined,
  onMouseLeave = onSelect ? () => onSelect(id, {lat, lng}) : undefined
}) {
  return (
    <Container
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      className={classNames(
        {
          highlight,
          text: typeof children === 'string',
          clickable: Boolean(onClick)
        },
        className
      )}
    >
      {children}
    </Container>
  )
}

class MapMarker extends PureComponent {
  static propTypes = {
    id: PropTypes.any.isRequired,
    minZoom: PropTypes.number
  }

  static defaultProps = {
    cluster: true
  }

  componentDidMount() {
    const {setMarker, cluster, id, lat, lng} = this.props
    if (cluster) setMarker(id, {id, lat, lng})
  }

  componentWillUnmount() {
    const {unsetMarker, cluster, id, lat, lng} = this.props
    if (cluster) unsetMarker(id, {id, lat, lng})
  }

  get isHighlight() {
    return typeof this.props.highlight !== 'undefined'
      ? this.props.highlight
      : this.props.getMarkerHighlight(this.props)
  }

  render() {
    const {
      marker,
      cluster,
      hasAggregators,
      isFramed,
      mapLoaded,
      zoom,
      minZoom,
      ...props
    } = this.props
    const isClustered = cluster && (hasAggregators || !isFramed)
    const isZoomedOut = minZoom && zoom > minZoom
    const children = <MarkerContainer {...props} highlight={this.isHighlight} />
    if (marker.container)
      return ReactDOM.createPortal(children, marker.container)
    if (!mapLoaded || isClustered || isZoomedOut) return null
    else return children
  }
}

export default withMapContext(
  (
    {
      markers,
      loaded,
      mapOptions,
      framedMarkers,
      hasAggregators,
      setMarker,
      unsetMarker,
      getMarkerHighlight
    },
    {id}
  ) => ({
    marker: markers[id] || {},
    getMarkerHighlight,
    setMarker,
    unsetMarker,
    hasAggregators,
    isFramed: framedMarkers.includes(id),
    mapLoaded: loaded,
    zoom: mapOptions.zoom
  })
)(MapMarker)
