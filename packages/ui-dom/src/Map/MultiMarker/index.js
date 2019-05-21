import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Marker, {List, ListItem} from './styles'
import {MarkerBase} from '../Marker'
import {withMapContext} from '../Context'

export class MultiMarkerBase extends PureComponent {
  static propTypes = {
    points: PropTypes.array.isRequired,
    ...MarkerBase.propTypes
  }

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
      ...props
    } = this.props
    delete props.id
    delete props.lat
    delete props.lng
    delete props.cluster
    return (
      <Marker
        onClick={onClick && onClick.bind(null, points)}
        style={style}
        className={classNames(className, 'multi-marker', {
          highlight: highlight.length > 0
        })}
        {...props}
      >
        <List borderRadius={props.borderRadius}>
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
}))(MultiMarkerBase)
