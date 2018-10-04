import {
  color,
  fontSize,
  fontWeight,
  fontFamily,
  fontStyle,
  lineHeight,
  textAlign
} from 'styled-system'

import {styleSheet} from '../utils'
import {letterSpacing} from '../styles'

export const container = styleSheet`
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
