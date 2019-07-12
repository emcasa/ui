import colors from './theme/colors'
import shadows, {shadowOpacity} from './theme/shadows'
import {
  LETTER_SPACING,
  BUTTON_HEIGHT,
  FONT_SIZE,
  FONT_WEIGHT,
  ICON_SIZE,
  BREAKPOINTS
} from './theme/measures'

export default {
  fontFamily: 'Rubik',
  breakpoints: Array.from(BREAKPOINTS.values()),
  breakpointNames: Array.from(BREAKPOINTS.keys()),
  space: [0, 4, 10, 14, 20, 25, 80],
  fontSizes: Array.from(FONT_SIZE.values()),
  fontWeights: Array.from(FONT_WEIGHT.values()),
  letterSpacing: Array.from(LETTER_SPACING.values()),
  buttonHeight: Array.from(BUTTON_HEIGHT.values()),
  iconSize: Array.from(ICON_SIZE.values()),
  defaultIcon: 'question-circle',
  shadowOpacity,
  shadows,
  colors
}
