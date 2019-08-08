import {themeGet} from 'styled-system'

export const MIN_AREA = 35

export const MAX_AREA = 500

export const MIN_PRICE = 200000

export const MAX_PRICE = 5000000

export const PRICE_STEP = 1000

export const MIN_PRICE_PER_AREA = 1000

export const MAX_PRICE_PER_AREA = 100000

export const PRICE_PER_AREA_STEP = 100

export const MIN_MAINTENANCE_FEE = 0

export const MAX_MAINTENANCE_FEE = 5000

export const MAINTENANCE_FEE_STEP = 100

export const BUTTON_HEIGHT = themeGet('buttonHeight.1')

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
