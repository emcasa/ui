import React, {PureComponent} from 'react'
import classNames from 'classnames'
import {MarkerContainer} from '../Marker'
import Marker, {List} from './styles'

export default class MultiMarker extends PureComponent {
  render() {
    const {
      className,
      points,
      onClick,
      highlight = [],
      id,
      lat,
      lng
    } = this.props
    return (
      <Marker
        id={id}
        lat={lat}
        lng={lng}
        cluster={false}
        highlight={false}
        onClick={onClick && onClick.bind(null, points)}
        className={classNames(className, {highlight: highlight.length > 0})}
      >
        <List>
          {points.map((marker) => (
            <MarkerContainer
              key={marker.id}
              highlight={highlight.indexOf(marker.id) !== -1}
              {...marker.props}
            />
          ))}
        </List>
      </Marker>
    )
  }
}
