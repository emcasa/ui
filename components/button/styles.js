import styled, { css } from 'styled-components'
import COLORS from 'shared/colors'
import MEASURES from 'shared/measures'

const BUTTON_HEIGHT = {
  tall: '60px',
  medium: '40px'
}

const Button = styled.button`
  font-size: ${MEASURES.font.default};
  letter-spacing: ${MEASURES.defaultLetterSpacing};
  padding: 8px 20px 8px 20px;
  border-radius: 4px;
  border: 1px solid;
  border-color: #e0e6ed;
  
  ${props => props.active && !props.disabled && css`
    color: ${COLORS.white};
    background-color: ${COLORS.pink};
    border-color: ${COLORS.pink};
  `}

  height: ${(props) => props.height ? BUTTON_HEIGHT[props.height] : BUTTON_HEIGHT.medium};

  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`

export default Button
