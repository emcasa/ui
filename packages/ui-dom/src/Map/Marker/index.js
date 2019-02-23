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
      onClick = () => onSelect && onSelect(id),
      onMouseEnter = () => onSelect && onSelect(id, {lat, lng}),
      onMouseLeave = () => onSelect && onSelect(id, {})
    } = this.props

    return (
      <Container
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        lat={lat}
        lng={lng}
        className={classNames({highlight, text: typeof children === 'string'})}
      >
        {children}
      </Container>
    )
  }
}
