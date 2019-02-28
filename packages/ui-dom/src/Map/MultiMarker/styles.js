import styled from 'styled-components'
import {themeGet} from 'styled-system'
import Marker, {markerTipStyle, markerTipHighlightStyle} from '../Marker/styles'

export default styled.div`
  position: absolute;
  transform: translate(-50%, -100%);
  border: 2px solid ${themeGet('colors.pink')};
  border-radius: 4px;
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.3);
  &:before {
    z-index: 2;
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 4px;
    border: 1px solid white;
    pointer-events: none;
  }
  &:after {
    ${markerTipStyle};
    margin-bottom: -2px;
  }
  &.highlight,
  &:hover {
    border-color: white;
    &:before {
      border-color: ${themeGet('colors.pink')};
    }
    &:after {
      ${markerTipHighlightStyle};
    }
  }
  ${Marker} {
    z-index: 0;
    position: relative;
    transform: none;
    margin: 0;
    border-radius: 0;
    &:after,
    &:before {
      display: none;
    }
  }
`

export const List = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
`
