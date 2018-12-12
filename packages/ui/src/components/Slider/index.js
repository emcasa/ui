import {css} from 'styled-components'
import {width, height, bgColor, zIndex} from 'styled-system'

import {buttonHeight} from '../../styles'
import {container as row} from '../Row'

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
  width: 100%;
  justify-content: center;
  ${row};
  ${width};
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
  ${height};
  ${bgColor};
  ${zIndex};
`

track.defaultProps = {
  width: '100%',
  bg: 'pink'
}
