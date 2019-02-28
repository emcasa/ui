import styled, {css} from 'styled-components'
import {themeGet} from 'styled-system'

export const markerTipStyle = css`
  bottom: -6px;
  content: '';
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 8px solid ${themeGet('colors.pink')};
`

export const markerTipHighlightStyle = css`
  border-top: 8px solid white;
`

export default styled.div`
  background: ${themeGet('colors.pink')};
  color: white;
  border-radius: 4px;
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.3);
  font-size: 12px;
  font-weight: 400;
  margin-top: -6px;
  padding: 3px 6px 4px;
  position: absolute;
  transform: translate(-50%, -100%)
    scale(${({highlight}) => (highlight ? 1.3 : 1)});
  transition: transform 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: ${({highlight}) => (highlight ? 1 : 0)};
  white-space: nowrap;
  &:after {
    ${markerTipStyle};
  }
  &:hover,
  &.highlight {
    z-index: 1;
    cursor: grab;
  }
  &.clickable:hover {
    cursor: pointer;
  }
  &.text:hover,
  &.text.highlight {
    background: white;
    color: ${themeGet('colors.pink')};
    &:after {
      ${markerTipHighlightStyle};
    }
  }
`
