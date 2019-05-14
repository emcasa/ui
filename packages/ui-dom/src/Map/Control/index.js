import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {withMapContext} from '../Context'
import View from '../../View'

class MapControl extends PureComponent {
  static propTypes = {
    position: PropTypes.oneOf([
      'top-center',
      'top-left',
      'top-right',
      'bottom-center',
      'bottom-left',
      'bottom-right',
      'right-center',
      'right-top',
      'right-bottom',
      'left-center',
      'left-top',
      'left-bottom'
    ]).isRequired
  }

  static defaultProps = {
    m: 2
  }

  componentDidMount() {
    this.control = document.createElement('div')
    if (this.control.style) this.control.style.cssText = this.style
  }

  get style() {
    const {zIndex} = this.props
    if (zIndex) return `z-index:${zIndex}`
    return ''
  }

  get position() {
    const {position, maps} = this.props
    const key = position
      ? position.toUpperCase().replace('-', '_')
      : 'TOP_CENTER'
    return maps.ControlPosition[key]
  }

  registerControl() {
    const {map} = this.props
    this.controlIndex = map.controls[this.position].length
    map.controls[this.position].push(this.control)
  }

  unregisterControl() {
    const {map} = this.props
    map.controls[this.position].removeAt(this.controlIndex)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.map !== this.props.map) this.registerControl()
  }

  componentWillUnmount() {
    if (this.props.map) this.unregisterControl()
  }

  render() {
    const {children, ...props} = this.props
    delete props.position
    delete props.map
    delete props.maps
    if (!this.control) return null
    return ReactDOM.createPortal(
      <View {...props}>{children}</View>,
      this.control
    )
  }
}

export default withMapContext(({map, maps}) => ({map, maps}))(MapControl)
