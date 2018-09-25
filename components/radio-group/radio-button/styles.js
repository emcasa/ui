import styled, { css } from 'styled-components'
import COLORS from 'shared/colors'
import {Circle} from 'styled-icons/fa-regular/Circle'
import {DotCircle} from 'styled-icons/fa-solid/DotCircle'

const SIZE = '20px'

const style = css`
  width: ${SIZE};
  height: ${SIZE};
  color: ${props => props.disabled ? COLORS.grey : COLORS.pink};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`

const Unchecked = styled(Circle)`${style}`
const Checked = styled(DotCircle)`${style}`

export {
  Unchecked,
  Checked
}
