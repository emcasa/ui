import React, {PureComponent} from 'react'
import classNames from 'classnames'
import Marker, {List} from './styles'

export default class MultiMarker extends PureComponent {
  render() {
    const {className, points, onClick, highlight = []} = this.props
    if (points.length === 1)
      return React.cloneElement(points[0].node, {
        onClick,
        highlight: highlight.length > 0
      })
    return (
      <Marker
        onClick={onClick && onClick.bind(null, points)}
        className={classNames(className, {highlight: highlight.length > 0})}
      >
        <List>
          {points.map((marker) =>
            React.cloneElement(marker.node, {
              highlight: highlight.indexOf(marker.id) !== -1
            })
          )}
        </List>
      </Marker>
    )
  }
}
