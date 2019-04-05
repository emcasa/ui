import {css} from 'styled-components'
import {flex, order, alignSelf, justifySelf} from 'styled-system'

import {container as view} from '../View'

export const container = css`
  box-sizing: border-box;
  ${view}
  ${flex}
  ${order}
  ${alignSelf}
  ${justifySelf}
`

container.propTypes = {
  ...view.propTypes,
  ...flex.propTypes,
  ...order.propTypes,
  ...alignSelf.propTypes,
  ...justifySelf.propTypes
}
