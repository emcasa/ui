import React, {PureComponent} from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import Measure from 'react-measure'
import {themeGet, zIndex} from 'styled-system'

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
    const {layout} = this.state
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
            values={animatedValues}
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
