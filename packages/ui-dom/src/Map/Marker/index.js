import React, {PureComponent} from 'react'
import classNames from 'classnames'
import Container from './styles'

export default class MapMarker extends PureComponent {
  render() {
    const {
      id,
      lat,
      lng,
      children,
      onSelect,
      highlight,
      onClick = onSelect ? () => onSelect(id) : undefined,
      onMouseEnter = onSelect ? () => onSelect(id, {lat, lng}) : undefined,
      onMouseLeave = onSelect ? () => onSelect(id, {}) : undefined
    } = this.props

    return (
      <Container
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        lat={lat}
        lng={lng}
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
}
