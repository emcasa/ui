import styled from 'styled-components'
import {themeGet, space} from 'styled-system'
import {getColor} from '../Marker/styles'

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${themeGet('space.2')}px;
  ${space};
  a {
    cursor: pointer;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li a {
    display: block;
    width: ${themeGet('space.2')}px;
    height: ${themeGet('space.2')}px;
    background: ${themeGet('colors.darkSmoke')};
    border-radius: ${themeGet('space.2')}px;
    margin: 0 2px;
    transform: scale(0.8);
    &.highlight {
      transform: scale(1);
      background: ${getColor('color', 'pink')};
    }
  }
`
