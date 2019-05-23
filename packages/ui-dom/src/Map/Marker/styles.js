import curry from 'lodash/curry'
import styled, {css} from 'styled-components'
import {borderRadius, zIndex, space} from 'styled-system'
import View from '../../View'

export const getColor = curry((prop, defaultColor, props) => {
  const {
    theme: {colors}
  } = props
  return (
    colors[props[prop]] || props[prop] || colors[defaultColor] || defaultColor
  )
})

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
  border-top: 8px solid ${getColor('bg', 'pink')};
`

export const markerTipHighlightStyle = css`
  border-top: 8px solid ${getColor('bg', 'white')};
`

export default styled(View)`
  background: ${getColor('bg', 'pink')};
  color: ${getColor('color', 'white')};
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
  ${borderRadius};
  ${space};
  ${zIndex};
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
    background: ${getColor('bg', 'white')};
    color: ${getColor('color', 'pink')};
    &:after {
      ${markerTipHighlightStyle};
    }
  }
`
