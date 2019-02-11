import React, {PureComponent} from 'react'
import styled from 'styled-components'
import * as slider from '@emcasa/ui/lib/components/Slider'

import View from '../Row'

const Track = styled.div`
  width: 100%;
  top: -50%;
  ${slider.track};
`

Track.displayName = 'SliderTrack'

Track.defaultProps = slider.track.defaultProps

class MarkerTrack extends PureComponent {
  render() {
    const {...props} = this.props
    delete props.position
    delete props.offset
    return (
      <Track
        style={{
          position: 'absolute',
          left: 0,
          right: 0
        }}
        {...props}
      />
    )
  }
}

export default class SliderTrackContainer extends PureComponent {
  static defaultProps = {
    markers: [],
    sliderLayout: {},
    trackProps: {}
  }

  renderMarkerTrack = (element, prevElement, index) => {
    const {trackProps} = element.props
    if (!trackProps) return
    return (
      <MarkerTrack
        key={element.key}
        zIndex={index + 1}
        {...this.props.trackProps}
        {...trackProps}
      />
    )
  }

  renderTrack() {
    const {markers} = this.props
    const children = []
    let prevMarker = undefined
    React.Children.forEach(markers, (element, index) => {
      if (!element.ref.current) return
      children.push(this.renderMarkerTrack(element, prevMarker, index))
      prevMarker = element
    })
    return children
  }

  render() {
    const {markers, trackProps} = this.props
    return (
      <View width="100%" height="1px">
        {/* markers.length && this.renderTrack() */}
        <Track zIndex={0} {...trackProps} />
      </View>
    )
  }
}
