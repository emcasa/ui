import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {withMapContext} from '../Context'
import View from '../../View'

const getPosition = ({position, maps}) => {
  const key = position ? position.toUpperCase().replace('-', '_') : 'TOP_CENTER'
  return maps.ControlPosition[key]
}

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

  get style() {
    const {zIndex} = this.props
    if (zIndex) return `z-index:${zIndex}`
    return ''
  }

  registerControl(position) {
    const {map, index, onControlReady} = this.props
    this.controlIndex = map.controls[position].length
    if (!isNaN(index)) this.control.index = index
    map.controls[position].push(this.control)
    if (onControlReady)
      onControlReady({
        control: this.control,
        element: map.controls[position].getAt(this.controlIndex)
      })
  }

  unregisterControl(position) {
    const {map} = this.props
    map.controls[position].removeAt(this.controlIndex)
  }

  componentDidMount() {
    this.control = document.createElement('div')
    if (this.control.style) this.control.style.cssText = this.style
  }

  componentDidUpdate(prevProps) {
    if (prevProps.map !== this.props.map)
      this.registerControl(getPosition(this.props))
    if (prevProps.position !== this.props.position) {
      this.unregisterControl(getPosition(prevProps))
      this.registerControl(getPosition(this.props))
    }
  }

  componentWillUnmount() {
    if (this.props.map) this.unregisterControl(getPosition(this.props))
  }

  render() {
    const {children, ...props} = this.props
    delete props.position
    delete props.map
    delete props.maps
    delete props.onControlReady
    delete props.index
    if (!this.control) return null
    return ReactDOM.createPortal(
      <View {...props}>{children}</View>,
      this.control
    )
  }
}

export default withMapContext(({map, maps}) => ({map, maps}))(MapControl)
