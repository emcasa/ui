import {css} from 'styled-components'
import {flex, order, alignSelf, justifySelf, color} from 'styled-system'

import {container as view} from '../View'

export const container = css`
  ${view}
  ${flex}
  ${order}
  ${alignSelf}
  ${justifySelf}
  ${color}
`

container.propTypes = {
  ...view.propTypes,
  ...flex.propTypes,
  ...order.propTypes,
  ...alignSelf.propTypes,
  ...justifySelf.propTypes,
  ...color.propTypes
}
