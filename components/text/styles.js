import styled from 'styled-components'
import COLORS from 'shared/colors'

const Text = styled.p`
  color: ${props => props.color ? props.color : COLORS.dark};
  font-family: 'FaktPro-Blond';
`

export default Text
