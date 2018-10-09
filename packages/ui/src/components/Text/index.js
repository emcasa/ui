import {css} from 'styled-components'
import {
  color,
  fontWeight,
  fontFamily,
  fontStyle,
  lineHeight,
  textAlign
} from 'styled-system'

import {letterSpacing, fontSize} from '../../styles'

export const container = css`
  ${letterSpacing}
  ${color}
  ${fontSize}
  ${fontWeight}
  ${fontFamily}
  ${fontStyle}
  ${lineHeight}
  ${textAlign}
`

container.propTypes = {
  ...letterSpacing.propTypes,
  ...color.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...fontFamily.propTypes,
  ...fontStyle.propTypes,
  ...lineHeight.propTypes,
  ...textAlign.propTypes
}

container.defaultProps = {
  fontFamily: 'FaktSoftPro-Blond',
  fontSize: 'default'
}
