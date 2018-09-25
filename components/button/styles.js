import styled, { css } from 'styled-components'

const Button = styled.button`
  font-size: 18px;
  letter-spacing: 0.56px;  
  height: 40px;
  padding: 8px 20px 8px 20px;
  border-radius: 4px;
  border: 1px solid;
  border-color: #e0e6ed;
  cursor: pointer;
  
  ${props => props.active && css`
    color: #ffffff;
    background-color: #f50057;
    border-color: #f50057;
  `}

  ${props => props.disabled && css`cursor: default;`}
`

export default Button
