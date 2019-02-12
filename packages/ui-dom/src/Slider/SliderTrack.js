import React, {PureComponent} from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import {withSliderContext} from '@emcasa/ui/lib/components/Slider/Context'
import * as slider from '@emcasa/ui/lib/components/Slider'
import Row from '../Row'

const Container = styled(Row)`
  position: relative;
  width: 100%;
  height: 2px;
`

const Track = styled.div`
  width: 100%;
  border-radius: 4px;
  ${slider.track};
`

Track.displayName = 'SliderTrack'

Track.defaultProps = slider.track.defaultProps

const MarkerTrack = styled(
  posed(React.forwardRef((props, ref) => <Track innerRef={ref} {...props} />))({
    passive: {
      width: ['x', (x) => x, true]
    }
  })
)`
  position: absolute;
  margin-top: ${({height}) => -((parseInt(height) || 2) - 2) / 2}px;
`

class SliderTrackContainer extends PureComponent {
  static defaultProps = {
    markers: [],
    sliderLayout: {},
    trackProps: {}
  }

  renderMarkerTrack = (marker, index) => {
    const {trackProps} = marker.element.props
    if (!trackProps) return
    return (
      <MarkerTrack
        key={marker.key}
        zIndex={this.props.markers.length - index + 1}
        parentValues={marker.state.animatedValues}
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
