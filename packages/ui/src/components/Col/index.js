import {css} from 'styled-components'
import {flex, order, alignSelf, justifySelf} from 'styled-system'

import {container as view} from '../View'

export const container = css`
  ${view}
  ${flex}
  ${order}
  ${alignSelf}
  ${justifySelf}
`
