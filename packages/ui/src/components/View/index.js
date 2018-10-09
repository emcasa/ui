import {css} from 'styled-components'
import {space, width, height, order, flex, alignSelf} from 'styled-system'

export const container = css`
  ${space}
  ${width}
  ${height}
  ${order}
  ${flex}
  ${alignSelf}
`

container.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...flex.propTypes,
  ...order.propTypes,
  ...alignSelf.propTypes
}

container.defaultProps = {
  body: false,
  bottom: false
}
