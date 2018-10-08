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

container.defaultProps = {
  fontFamily: 'FaktSoftPro-Blond',
  fontSize: 'default',
  letterSpacing: 'default'
}
