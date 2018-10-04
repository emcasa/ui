import {flex, order, alignSelf, justifySelf} from 'styled-system'

import {container as view} from './View'
import {styleSheet} from '../utils'

export const container = styleSheet`
  ${view}
  ${flex}
  ${order}
  ${alignSelf}
  ${justifySelf}
`
