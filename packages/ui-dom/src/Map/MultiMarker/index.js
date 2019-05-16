import React, {PureComponent} from 'react'
import classNames from 'classnames'
import Marker, {List, ListItem} from './styles'
import {withMapContext} from '../Context'

class MultiMarker extends PureComponent {
  markers = {}

  componentDidMount() {
    if (this.props.setMarkerContainer) {
      Object.entries(this.markers).map(([id, ref]) =>
        this.props.setMarkerContainer(id, ref)
      )
    }
  }

  componentWillUnmount() {
    if (this.props.setMarkerContainer) {
      Object.entries(this.markers).map(([id]) => {
        this.props.setMarkerContainer(id, undefined)
      })
    }
  }

  containerRef = (id) => (ref) => {
    this.markers[id] = ref
  }

  render() {
    const {
      children,
      style,
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
        style={style}
        className={classNames(className, 'multi-marker', {
          highlight: highlight.length > 0
        })}
      >
        <List>
          {points.map(({id}) => (
            <ListItem key={id} ref={this.containerRef(id)} />
          ))}
        </List>
        {children}
      </Marker>
    )
  }
}

export default withMapContext(({setMarkerContainer}) => ({
  setMarkerContainer
}))(MultiMarker)
