import {css} from 'styled-components'
import {
  color,
  fontFamily,
  fontStyle,
  lineHeight,
  textAlign
} from 'styled-system'
import propTypes from '@styled-system/prop-types'
import {
  letterSpacing,
  fontSize,
  fontWeight,
  defaultFontFamily
} from '../../styles'

export const container = css`
  ${defaultFontFamily}
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
  ...propTypes.typography,
  ...color.propTypes
}

container.defaultProps = {
  fontSize: 'default',
  color: 'dark'
}
