import React, {PureComponent} from 'react'
import styled from 'styled-components'
import {withSliderContext} from '@emcasa/ui/lib/components/Slider/Context'
import Row from '../Row'
import Track from './Track'
import MarkerTrack from './MarkerTrack'
import {value} from 'popmotion'

const Container = styled(Row)`
  position: relative;
  width: 100%;
  height: 2px;
`

const initialValue = value(0)

class SliderTrackContainer extends PureComponent {
  static defaultProps = {
    markers: [],
    sliderLayout: {},
    trackProps: {}
  }

  renderMarkerTrack = (marker, index) => {
    const {trackProps} = marker.element.props
    if (!trackProps) return
    const prevMarker = index > 0 ? this.props.markers[index - 1] : undefined
    return (
      <MarkerTrack
        key={marker.key}
        zIndex={this.props.markers.length - index + 1}
        x={marker.state.animatedValues.x}
        offset={prevMarker ? prevMarker.state.animatedValues.x : initialValue}
        {...this.props.trackProps}
        {...trackProps}
      />
    )
  }

  render() {
    const {markers, trackProps} = this.props
    return (
      <Container>
        {markers && markers.map(this.renderMarkerTrack)}
        <Track zIndex={0} {...trackProps} />
      </Container>
    )
  }
}

export default withSliderContext(({markers, layout}) => ({
  markers,
  sliderLayout: layout
}))(SliderTrackContainer)
