import PropTypes from 'prop-types'
import {css} from 'styled-components'
import {themeGet} from '@styled-system/theme-get'
import {defaultFontFamily} from '../../styles'

export const container = {
  propTypes: {
    error: PropTypes.node,
    label: PropTypes.node,
    hideLabelView: PropTypes.bool,
    hideErrorView: PropTypes.bool
  },
  defaultProps: {
    hideLabelView: false,
    hideErrorView: false
  }
}

export const textContainer = css`
  min-height: ${themeGet('space.5')}px;
`

export const label = css`
  margin-bottom: ${themeGet('space.3')}px;
  color: ${themeGet('colors.grey900')};
  font-size: ${themeGet('fontSizes.2')}px;
  font-weight: ${themeGet('fontWeights.0')};
  ${defaultFontFamily};
`

export const error = css`
  margin-top: ${themeGet('space.3')}px;
  color: ${themeGet('colors.pink500')};
  font-size: ${themeGet('fontSizes.1')}px;
  ${defaultFontFamily};
`
