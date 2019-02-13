import React, {PureComponent} from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import Measure from 'react-measure'
import {zIndex} from 'styled-system'

const MarkerWrapper = styled(
  posed.div({
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
    transition: box-shadow 250ms ease-in-out;
  }
  &:focus {
    outline: none;
  }
  ${zIndex};
`

export default class MarkerHandler extends PureComponent {
  static defaultProps = {
    zIndex: 100,
    hitSlop: 15
  }

  state = {
    layout: undefined,
    focus: false
  }

  static getDerivedStateFromProps(props, state) {
    return {layout: props.layout || state.layout}
  }

  componentDidUpdate(prevProps) {
    const {animatedValues} = this.props
    if (
      prevProps.position !== this.props.posed &&
      prevProps.value === this.props.value &&
      this.props.position !== animatedValues.x.get()
    ) {
      this.props.animatedValues.x.update(this.props.position)
    }
  }

  onResize = ({entry}) =>
    this.setState({layout: {width: entry.width, height: entry.height}})

  onChange = (x) => {
    const {index, onSlide} = this.props
    if (onSlide) {
      onSlide(index, x)
    }
  }

  onDragEnd = () => {
    const {onSlideStop} = this.props
    if (onSlideStop) onSlideStop()
  }

  onFocus = () => this.setState({focus: true})

  onBlur = () => this.setState({focus: false})

  render() {
    const {
      children,
      bounds,
      hitSlop,
      position,
      value,
      sliderLayout,
      index,
      zIndex,
      animatedValues
    } = this.props
    const {layout, focus} = this.state
    return (
      <Measure onResize={this.onResize}>
        {({measureRef}) => (
          <MarkerWrapper
            innerRef={measureRef}
            bounds={bounds}
            tabIndex={0}
            zIndex={index + zIndex}
            hitSlop={hitSlop}
            layout={layout}
            sliderLayout={sliderLayout}
            onValueChange={{x: this.onChange}}
            onDragEnd={this.onDragEnd}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            values={animatedValues}
          >
            {React.cloneElement(children, {
              focus,
              markerState: {position, value, bounds}
            })}
          </MarkerWrapper>
        )}
      </Measure>
    )
  }
}
