import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Container from './styles'

export default function Marker({
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

Marker.defaultProps = {
  cluster: true
}

Marker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  highlight: PropTypes.bool,
  /** Enable clustering this marker */
  cluster: PropTypes.bool,
  /** Marker's unique id, required for clustering */
  id: PropTypes.any,
  /** Called on all mouse interaction: inClick, onMouseEnter, onMouseLeave */
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  onMuseEnter: PropTypes.func,
  onMuseLeave: PropTypes.func
}
