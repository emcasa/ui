import {css} from 'styled-components'
import {width, bgColor} from 'styled-system'

export {default} from './hoc'

/**
 * Component structure
 * <container>
 *   <markerContainer><marker /></markerContainer>
 *   <markerContainer><marker /></markerContainer>
 *   <track />
 * </container>
 */

export const container = css``

export const marker = css`
  position: absolute;
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
  ${bgColor};
`

track.defaultProps = {
  width: '100%',
  bg: 'pink'
}
