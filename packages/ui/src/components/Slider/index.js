import {css} from 'styled-components'
import {width, height, bgColor} from 'styled-system'
import {buttonHeight} from '../../styles'

export {default} from './hoc'

/**
 * Component structure
 * <container>
 *   <markerContainer><marker /></markerContainer>
 *   <markerContainer><marker /></markerContainer>
 *   <track />
 * </container>
 */

export const container = css`
  ${buttonHeight};
`

container.defaultProps = {
  height: 'tall',
  trackProps: {}
}

export const marker = css`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size}px;
  ${bgColor};
`

marker.defaultProps = {
  size: 16,
  bg: 'pink'
}

export const track = css`
  position: relative;
  height: 2px;
  border-radius: 2px;
  ${width};
  ${height};
  ${bgColor};
`

track.defaultProps = {
  width: '100%',
  bg: 'pink'
}
