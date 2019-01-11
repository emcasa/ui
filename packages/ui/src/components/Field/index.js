import PropTypes from 'prop-types'
import {css} from 'styled-components'
import {themeGet} from 'styled-system'
import {defaultFontFamily} from '../../styles'

export const container = {
  propTypes: {
    error: PropTypes.string,
    label: PropTypes.string,
    hideLabelView: PropTypes.bool,
    hideErrorView: PropTypes.bool
  },
  defaultProps: {
    hideLabelView: false,
    hideErrorView: false
  }
}

export const textContainer = css`
  display: block;
  height: ${themeGet('space.5')}px;
`

export const label = css`
  font-size: ${themeGet('fontSizes.1')}px;
  ${defaultFontFamily};
`

export const error = css`
  color: ${themeGet('colors.red')};
  font-size: ${themeGet('fontSizes.1')}px;
  ${defaultFontFamily};
`
