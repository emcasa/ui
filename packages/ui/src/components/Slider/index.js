import {css} from 'styled-components'
import {width, height, backgroundColor, zIndex} from 'styled-system'

import {buttonHeight} from '../../styles'
import {container as col} from '../Col'

export {default} from './hoc'

/**
 * Component structure
 * <container>
 *   <markerContainer><marker /></markerContainer>
 *   <markerContainer><marker /></markerContainer>
 *   <track>
 *     <markerTrack />
 *     <markerTrack />
 *   </track>
 * </container>
 */

export const container = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  ${col};
  ${width};
  ${buttonHeight};
`

container.defaultProps = {
  width: '100%',
  height: 'tall'
}

export const marker = css`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size}px;
  ${backgroundColor};
  ${({focus, theme}) =>
    focus && `box-shadow: 0 0 0 10px ${theme.colors.pink}50;`};
`

marker.label = css`
  position: absolute;
  bottom: ${({size}) => size}px;
  left: ${({size}) => parseInt(size) / 2}px;
`

marker.defaultProps = {
  size: 16,
  bg: 'pink'
}

export const track = css`
  position: relative;
  height: 2px;
  ${height};
  ${backgroundColor};
  ${zIndex};
`

track.defaultProps = {
  width: '100%',
  bg: 'pink'
}
