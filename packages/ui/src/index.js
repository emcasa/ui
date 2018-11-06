import {fas} from '@fortawesome/free-solid-svg-icons'
import colors from './theme/colors'
import shadows, {shadowOpacity} from './theme/shadows'
import {
  LETTER_SPACING,
  BUTTON_HEIGHT,
  FONT_SIZE,
  ICON_SIZE
} from './theme/measures'

export default {
  fontFamily: 'FaktSoftPro-Normal',
  breakpoints: ['640px'],
  space: [0, 4, 10, 14, 20, 25, 80],
  fontSizes: Array.from(FONT_SIZE.values()),
  letterSpacing: Array.from(LETTER_SPACING.values()),
  buttonHeight: Array.from(BUTTON_HEIGHT.values()),
  iconSize: Array.from(ICON_SIZE.values()),
  icons: {default: fas},
  defaultIcon: 'question-circle',
  shadowOpacity,
  shadows,
  colors
}
