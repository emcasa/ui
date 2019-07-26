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

const ARROW_RIGHT = 39
const ARROW_UP = 38
const ARROW_LEFT = 37
const ARROW_DOWN = 40

export default class MarkerHandler extends PureComponent {
  static defaultProps = {
    zIndex: 100,
    hitSlop: 15,
    step: 1,
    incrementKeys: [ARROW_RIGHT, ARROW_UP],
    decrementKeys: [ARROW_LEFT, ARROW_DOWN]
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
    if (prevProps.disabled !== this.props.disabled) {
      if (this.props.disabled) this._unregisterListeners()
      else this._registerListeners()
    }
  }

  _registerListeners() {
    document.addEventListener('keydown', this.onKeyPress)
  }

  _unregisterListeners() {
    document.removeEventListener('keydown', this.onKeyPress)
  }

  componentDidMount() {
    if (!this.props.disabled) this._registerListeners()
  }

  componentWillUnmount() {
    if (!this.props.disabled) this._unregisterListeners()
  }

  onResize = ({entry}) => {
    if (!entry) {
      return
    }
    this.setState({layout: {width: entry.width, height: entry.height}})
  }

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

  onKeyPress = (e) => {
    const {
      step,
      bounds,
      animatedValues,
      incrementKeys,
      decrementKeys
    } = this.props
    if (!this.state.focus) return
    let value = animatedValues.x.get()
    if (incrementKeys.indexOf(e.keyCode) !== -1) value += step
    else if (decrementKeys.indexOf(e.keyCode) !== -1) value -= step
    else return
    e.preventDefault()
    animatedValues.x.update(bounds.clamp(value))
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
      disabled,
      animatedValues
    } = this.props
    const {layout, focus} = this.state
    let zIndex = (disabled ? -1 : index) + this.props.zIndex
    if (focus) zIndex += 100
    return (
      <Measure onResize={this.onResize}>
        {({measureRef}) => (
          <MarkerWrapper
            ref={measureRef}
            bounds={bounds}
            tabIndex={0}
            zIndex={zIndex}
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
