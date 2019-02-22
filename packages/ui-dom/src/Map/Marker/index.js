import React, {PureComponent} from 'react'
import Container from './styles'

export default class MapMarker extends PureComponent {
  render() {
    const {id, lat, lng, text, onSelect, highlight} = this.props

    return (
      <Container
        onClick={() => onSelect && onSelect(id)}
        onMouseEnter={() => onSelect && onSelect(id, {lat, lng})}
        onMouseLeave={() => onSelect && onSelect(id, {})}
        lat={lat}
        lng={lng}
        highlight={highlight}
        text={text}
      >
        {text}
      </Container>
    )
  }
}
