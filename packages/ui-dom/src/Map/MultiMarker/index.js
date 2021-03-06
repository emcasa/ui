import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Marker, {Body, List, ListItem} from './styles'
import {withMapContext} from '../Context'

export class MultiMarkerBase extends PureComponent {
  static propTypes = {
    points: PropTypes.array.isRequired,
    highlight: PropTypes.array,
    onClick: PropTypes.func,
    /** Get props for child marker container elements */
    getMarkerProps: PropTypes.func
  }

  static defaultProps = {
    getMarkerProps: (point, index) => ({})
  }

  render() {
    const {
      children,
      style,
      className,
      points,
      markers,
      onClick,
      highlight = [],
      getMarkerProps,
      ...props
    } = this.props
    return (
      <Marker
        onClick={onClick}
        style={style}
        className={classNames(className, 'multi-marker', {
          highlight: highlight.length > 0
        })}
        {...props}
      >
        <Body borderRadius={props.borderRadius}>
          <List>
            {points.map((point, index) => (
              <ListItem
                key={point.id}
                {...getMarkerProps(
                  {...point, highlight: highlight.indexOf(point.id) !== -1},
                  index
                )}
              >
                {markers[point.index]}
              </ListItem>
            ))}
          </List>
          {children}
        </Body>
      </Marker>
    )
  }
}

export default withMapContext(({setMarkerContainer, markers}) => ({
  markers,
  setMarkerContainer
}))(MultiMarkerBase)
