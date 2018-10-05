import {css} from 'styled-components'
import {
  flexWrap,
  flexBasis,
  flexDirection,
  alignItems,
  justifyContent
} from 'styled-system'

import {container as col} from '../Col'

export const container = css`
  display: flex;
  ${col}
  ${flexWrap}
  ${flexBasis}
  ${flexDirection}
  ${alignItems}
  ${justifyContent}
`
