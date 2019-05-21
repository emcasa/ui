import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Container from './styles'
import {withMapContext} from '../Context'

export function MarkerContainer({
  id,
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
      className={classNames({
        highlight,
        text: typeof children === 'string',
        clickable: Boolean(onClick)
      })}
    >
      {children}
    </Container>
  )
}

class MapMarker extends PureComponent {
  static propTypes = {
    id: PropTypes.any.isRequired
  }

  static defaultProps = {
    cluster: true
  }

  componentDidMount() {
    if (this.props.cluster) this.props.registerMarker(this.props)
  }

  componentWillUnmount() {
    if (this.props.cluster) this.props.unregisterMarker(this.props)
  }

  get isHighlight() {
    return typeof this.props.highlight !== 'undefined'
      ? this.props.highlight
      : this.props.getMarkerHighlight(this.props)
  }

  render() {
    const {cluster, hasAggregators, isFramed, mapLoaded, ...props} = this.props
    if (!mapLoaded || (cluster && (hasAggregators || !isFramed))) return null
    return <MarkerContainer {...props} highlight={this.isHighlight} />
  }
}

export default withMapContext(
  (
    {
      framedMarkers,
      hasAggregators,
      loaded,
      registerMarker,
      unregisterMarker,
      getMarkerHighlight
    },
    {id}
  ) => ({
    getMarkerHighlight,
    registerMarker,
    unregisterMarker,
    hasAggregators,
    isFramed: framedMarkers.includes(id),
    mapLoaded: loaded
  })
)(MapMarker)
