import React, {PureComponent} from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import {themeGet, zIndex} from 'styled-system'
import Measure from 'react-measure'

const MarkerWrapper = styled(
  posed.div({
    default: {
      x: ({position}) => position
    },
    draggable: 'x',
    dragBounds: ({bounds}) => ({
      left: bounds.left,
      right: bounds.right
    })
  })
)`
  cursor: ew-resize;
  position: absolute;
  padding: ${({hitSlop}) => hitSlop}px;
  ${({layout, hitSlop}) =>
    layout ? {left: `-${layout.width / 2 + hitSlop}px`} : {opacity: 0}};
  & > * {
    transition: box-shadow 200ms ease-in-out;
  }
  &:focus {
    outline: none;
    & > * {
      box-shadow: 0 0 2px 2px ${themeGet('colors.blue')};
    }
  }
  ${zIndex};
`

export default class MarkerHandler extends PureComponent {
  static defaultProps = {
    zIndex: 100,
    hitSlop: 15
  }

  state = {
    layout: undefined
  }

  static getDerivedStateFromProps(props, state) {
    const nextState = {}
    if (props.markerLayout) nextState.layout = props.markerLayout
    if (typeof state.initialPosition === 'undefined')
      nextState.initialPosition = props.position
    return nextState
  }

  _addEvents = () => {}

  _removeEvents = () => {}

  componentDidMount() {
    if (!this.props.disabled) this._addEvents()
  }

  componentWillUnmount() {
    if (!this.props.disabled) this._removeEvents()
  }

  onResize = ({entry}) =>
    this.setState({layout: {width: entry.width, height: entry.height}})

  onChange = (x) => {
    const {name, onSlide} = this.props
    if (onSlide) {
      onSlide(name, x)
    }
  }

  onDragEnd = () => {
    const {onSlideStop} = this.props
    if (onSlideStop) onSlideStop()
  }

  render() {
    const {
      children,
      bounds,
      hitSlop,
      position,
      value,
      sliderLayout,
      index,
      zIndex
    } = this.props
    const {layout, initialPosition} = this.state
    return (
      <Measure onResize={this.onResize}>
        {({measureRef}) => (
          <MarkerWrapper
            innerRef={measureRef}
            pose="default"
            position={initialPosition}
            bounds={bounds}
            tabIndex={0}
            zIndex={index + zIndex}
            hitSlop={hitSlop}
            layout={layout}
            sliderLayout={sliderLayout}
            onValueChange={{x: this.onChange}}
            onDragEnd={this.onDragEnd}
          >
            {React.cloneElement(children, {
              markerState: {position, value, bounds}
            })}
          </MarkerWrapper>
        )}
      </Measure>
    )
  }
}
