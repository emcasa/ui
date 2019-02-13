import styled from 'styled-components'
import * as slider from '@emcasa/ui/lib/components/Slider'

const Track = styled.div`
  width: 100%;
  border-radius: 4px;
  ${slider.track};
`

Track.displayName = 'SliderTrack'

Track.defaultProps = slider.track.defaultProps

export default Track
