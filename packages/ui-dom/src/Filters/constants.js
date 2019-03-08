import {themeGet} from 'styled-system'

export const MIN_AREA = 35

export const MAX_AREA = 500

export const MIN_PRICE = 250000

export const MAX_PRICE = 2000000

export const BUTTON_HEIGHT = themeGet('buttonHeight.2')

export const ROW_PADDING = themeGet('space.2')

export const ROW_HEIGHT = (props) =>
  BUTTON_HEIGHT(props) + ROW_PADDING(props) * 2

export const TOP_SPACING = (props) =>
  (!props.row.visible
    ? 0
    : props.row.expanded
      ? props.offset
      : ROW_HEIGHT(props)) +
  props.theme.space[4] * 2

export const MOBILE_PANEL_MIN_HEIGHT = 200

export const DESKTOP_PANEL_WIDTH = ({width}) => width || 300
