import {
  flexWrap,
  flexBasis,
  flexDirection,
  alignItems,
  justifyContent
} from 'styled-system'

import {container as col} from './Col'
import {styleSheet} from '../utils'

export const container = styleSheet`
  display: flex;
  ${col}
  ${flexWrap}
  ${flexBasis}
  ${flexDirection}
  ${alignItems}
  ${justifyContent}
`
