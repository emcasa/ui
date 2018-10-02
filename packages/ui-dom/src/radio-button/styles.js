import styled, { css } from 'styled-components'
import COLORS from 'components/shared/colors'
import MEASURES from 'components/shared/measures'
import {Circle} from 'styled-icons/fa-regular/Circle'
import {DotCircle} from 'styled-icons/fa-solid/DotCircle'

const BULLET_SIZE = '20px'

const bulletStyle = css`
  width: ${BULLET_SIZE};
  height: ${BULLET_SIZE};
  color: ${props => props.disabled ? COLORS.grey : COLORS.pink};
  margin-right: ${MEASURES.spacing.normal};
`

const Unchecked = styled(Circle)`${bulletStyle}`
const Checked = styled(DotCircle)`${bulletStyle}`

const Container = styled.div`
  height: ${MEASURES.buttonHeight.tall};
  border-radius: 4px;
  border: 1px solid;
  border-color: ${props => props.checked ? COLORS.pink : COLORS.lightGrey};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  padding: ${MEASURES.spacing.short};
  display: flex;
  align-items: center;
`

const Label = styled.label`
  color: ${props => props.disabled ? COLORS.disabled : COLORS.dark};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`

export {
  Unchecked,
  Checked,
  Container,
  Label
}
