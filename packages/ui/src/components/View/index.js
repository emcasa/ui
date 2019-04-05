import {css} from 'styled-components'
import {
  space,
  width,
  height,
  order,
  flex,
  alignSelf,
  backgroundColor
} from 'styled-system'
import elevation from '../../styles/elevation'

export const container = css`
  ${space}
  ${width}
  ${height}
  ${order}
  ${flex}
  ${alignSelf}
  ${backgroundColor}
  ${elevation}
`

container.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...flex.propTypes,
  ...order.propTypes,
  ...alignSelf.propTypes,
  ...backgroundColor.propTypes,
  ...elevation.propTypes
}

container.defaultProps = {
  body: false,
  bottom: false
}
