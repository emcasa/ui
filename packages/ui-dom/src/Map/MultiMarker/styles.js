import styled from 'styled-components'
import {borderRadius} from 'styled-system'
import Marker, {getColor, markerTipHighlightStyle} from '../Marker/styles'

export default styled(Marker)`
  position: absolute;
  border: 2px solid ${getColor('bg', 'pink')};
  background: ${getColor('bg', 'pink')};
  padding: 0;
  &:before {
    z-index: 2;
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 4px;
    border: 1px solid ${getColor('color', 'pink')};
    pointer-events: none;
    ${borderRadius};
  }
  &:after {
    margin-bottom: -2px;
  }
  &.highlight,
  &:hover {
    border-color: ${getColor('bg', 'white')};
    background: ${getColor('bg', 'white')};
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
    box-shadow: none;
    &:after,
    &:before {
      display: none;
    }
  }
`

export const Body = styled.div`
  overflow: hidden;
  flex: 1;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  ${borderRadius};
`

export const List = styled.ul`
  list-style: none;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`

export const ListItem = styled.li`
  list-style: none;
`
