import styled from 'styled-components'
import {themeGet} from '@styled-system/theme-get'
import {breakpoint} from '@emcasa/ui/lib/styles'
import {gridSize, GRID_SPACING} from '../styles/grid'

export const DraggableContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`

export const DraggableContainer = styled.div`
  min-width: 100%;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 2px 0 #ffffff, 0 4px 30px 0 rgba(38, 38, 38, 0.3);
  opacity: ${({isDragging}) => (isDragging ? 0 : 1)};
  cursor: ${({isDragging}) => (isDragging ? 'grabbing' : 'grab')};
  flex: 1;
  padding-bottom: 64%;
  transition: all 300ms;

  > div.trash {
    position: absolute;
    top: ${themeGet('space.2')}px;
    left: ${themeGet('space.3')}px;
    cursor: pointer;
    z-index: 2;
    color: white;
    svg {
      filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.6));
    }
  }
`

export const DraggableWrapper = styled.div`
  box-sizing: border-box;
  margin: ${GRID_SPACING}%;
  ${({isDragging, theme}) =>
    isDragging && {
      border: `2px dashed ${theme.colors.disabled}`,
      margin: `calc(${GRID_SPACING}% - 2px) ${GRID_SPACING}%`
    }};
  box-shadow: ${({isActive, theme}) =>
    isActive ? `0 0 1px 2px ${theme.colors.pink}` : 'none'};
  border-radius: 4px;
  background-color: ${themeGet('colors.lightGrey')};
  display: flex;
  flex: 0 0 calc(${gridSize('desktop')} - ${GRID_SPACING * 2}%);
  @media ${breakpoint.down('tablet')} {
    flex: 0 0 calc(${gridSize('tablet')} - ${GRID_SPACING * 2}%);
  }
  @media ${breakpoint.down('phone')} {
    flex: 0 0 calc(${gridSize('phone')} - ${GRID_SPACING * 2}%);
  }
`
