import identity from 'lodash/identity'
import React, {PureComponent} from 'react'
import styled from 'styled-components'
import {value} from 'popmotion'
import posed from 'react-pose'
import Track from './Track'

const MarkerTrackAnimation = styled(
  posed(
    React.forwardRef(({style, ...props}, ref) => {
      delete props.x
      delete props.offset
      return (
        <Track
          ref={ref}
          style={Object.assign({position: 'absolute'}, style)}
          {...props}
        />
      )
    })
  )({
    passive: {
      width: ['x', identity, true],
      left: ['offset', identity, true]
    }
  })
)`
  margin-top: ${({height}) => -((parseInt(height) || 2) - 2) / 2}px;
`

export default class MarkerTrack extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      values: this._getParentValues()
    }
  }

  _getParentValues = () => {
    const {x, offset} = this.props
    const values = {
      x: value(x.get() - offset.get()),
      offset
    }
    this.unsubscribeFromX = x.subscribe({
      update: (value) => values.x.update(value - offset.get())
    })
    this.unsubscribeFromOffset = offset.subscribe({
      update: (value) => values.x.update(x.get() - value)
    })
    return values
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sliderLayout.width !== this.props.sliderLayout.width) {
      this.unsubscribeFromX()
      this.unsubscribeFromOffset()
      this.setState({values: this._getParentValues()})
    }
  }

  render() {
    const {...props} = this.props
    const {values} = this.state
    return <MarkerTrackAnimation {...props} parentValues={values} />
  }
}
