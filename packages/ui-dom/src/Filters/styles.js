import styled from 'styled-components'
import {color, borderColor} from 'styled-system'
import Button from '../Button'
import View from '../View'

export const FilterButton = styled(Button).attrs({type: 'button'})`
  ${borderColor};
  ${color};
`

export const Panel = styled(View)``
