import {css} from 'styled-components'
import {color, fontFamily} from 'styled-system'

import {letterSpacing, buttonHeight, fontSize} from '../../styles'

export const container = css`
  ${(props) => props.fluid && css`display: block;`}
  width: ${({fluid}) => fluid ? '100%' : 'auto'};
  ${buttonHeight};

  padding: 0 20px 0 20px;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({active, disabled, theme: {colors}}) =>
    active && !disabled ? colors.pink : colors.lightGrey};
  background-color: ${({active, disabled, theme: {colors}}) =>
    active && !disabled ? colors.pink : colors.white};

  & :hover {
    background-color: ${({active, disabled, theme: {colors}}) =>
      active && !disabled ? colors.pink : colors.white};
  }
`

container.defaultProps = {
  height: 'medium',
  fluid: false
}

export const text = css`
  color: ${({active, disabled, theme: {colors}}) => {
    if (disabled) return colors.disabled
    else if (active) return colors.white
    else return colors.dark
  }};
  ${letterSpacing}
  ${fontFamily}
  ${fontSize}
  ${color}
`

text.defaultProps = {
  fontFamily: 'FaktSoftPro-Normal',
  fontSize: 'default'
}
