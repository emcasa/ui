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
  onMouseLeave = onSelect ? () => onSelect(id, {lat, lng}) : undefined,
  ...props
}) {
  return (
    <Container
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      className={classNames(className, {
        highlight,
        text: typeof children === 'string',
        clickable: Boolean(onClick)
      })}
      {...props}
    >
      {children}
    </Container>
  )
}

export class MarkerBase extends PureComponent {
  static propTypes = {
    /** Marker's unique identifier */
    id: PropTypes.any.isRequired,
    highlight: PropTypes.bool,
    /** Minimum zoom to show this marker */
    minZoom: PropTypes.number,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    /** Callback for onClick, onMouseEnter and onMouseLeave */
    onSelect: PropTypes.func
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

  render() {
    const {
      marker,
      isClustered,
      isFramed,
      mapLoaded,
      zoom,
      minZoom,
      ...props
    } = this.props
    const isZoomedOut = minZoom && zoom > minZoom
    const children = <MarkerContainer {...props} />
    if (marker.container)
      return ReactDOM.createPortal(children, marker.container)
    if (!mapLoaded || !isFramed || isClustered || isZoomedOut) return null
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
      clusteredMarkers,
      hasAggregators,
      setMarker,
      unsetMarker,
      isHighlight
    },
    {id, highlight}
  ) => ({
    marker: markers[id] || {},
    setMarker,
    unsetMarker,
    isFramed: framedMarkers.indexOf(id) !== -1,
    isClustered: hasAggregators && clusteredMarkers.indexOf(id) !== -1,
    highlight: typeof highlight === 'undefined' ? isHighlight(id) : highlight,
    mapLoaded: loaded,
    zoom: mapOptions.zoom
  })
)(MarkerBase)
