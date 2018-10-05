import {css} from 'styled-components'
import {
  color,
  fontSize,
  fontWeight,
  fontFamily,
  fontStyle,
  lineHeight,
  textAlign
} from 'styled-system'

import {letterSpacing} from '../../styles'

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

container.defaultProps = {
  fontFamily: 'FaktSoftPro-Normal',
  fontSize: 'default',
  letterSpacing: 'default'
}
