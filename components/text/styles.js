import styled from 'styled-components'
import COLORS from 'shared/colors'

const View = styled.div`
  color: ${props => props.color ? props.color : COLORS.dark};
`

export default View
