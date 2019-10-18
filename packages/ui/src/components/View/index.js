import {css} from 'styled-components'
import {
  space,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  order,
  flex,
  alignSelf,
  background
} from 'styled-system'
import elevation from '../../styles/elevation'

export const container = css`
  ${space}
  ${width}
  ${maxWidth}
  ${minWidth}
  ${height}
  ${maxHeight}
  ${minHeight}
  ${order}
  ${flex}
  ${alignSelf}
  ${background}
  ${elevation}
`

container.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...minWidth.propTypes,
  ...maxWidth.propTypes,
  ...height.propTypes,
  ...minHeight.propTypes,
  ...maxHeight.propTypes,
  ...flex.propTypes,
  ...order.propTypes,
  ...alignSelf.propTypes,
  ...background.propTypes,
  ...elevation.propTypes
}

container.defaultProps = {
  body: false,
  bottom: false
}
