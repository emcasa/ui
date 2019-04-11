import PropTypes from 'prop-types'
import {css} from 'styled-components'
import {space, width, justifyContent, alignItems} from 'styled-system'

import {ICON_SIZE} from '../../theme/measures'
import {iconHeight, buttonHeight} from '../../styles'

export {default} from './hoc'

export const container = css`
  display: flex;
  align-items: center;
  width: auto;
  ${space};
  ${width};
  ${justifyContent};
  ${alignItems};
  ${(props) => {
    if (props.height) return buttonHeight(props)
    else if (props.size) return iconHeight(props)
  }};
`

container.propTypes = {
  ...space.propTypes,
  type: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  stroke: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(Array.from(ICON_SIZE.keys()))
  ])
}

container.defaultProps = {
  type: 'default',
  size: 'default'
}
