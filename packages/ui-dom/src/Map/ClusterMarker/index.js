import React, {PureComponent} from 'react'
import MarkerCounter from './styles'

export default class ClusterMarker extends PureComponent {
  render() {
    const {points, onClick, highlight = []} = this.props
    return (
      <MarkerCounter
        onClick={onClick && onClick.bind(null, points)}
        highlight={highlight.length > 0}
      >
        <span>{points.length}</span>
      </MarkerCounter>
    )
  }
}
