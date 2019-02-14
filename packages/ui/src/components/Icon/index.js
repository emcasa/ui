import PropTypes from 'prop-types'
import {css} from 'styled-components'
import {space, width, height} from 'styled-system'

import {ICON_SIZE} from '../../theme/measures'
import {iconHeight} from '../../styles'

export {default} from './hoc'

export const container = css`
  ${space};
  width: auto;
  ${width};
  ${(props) => {
    if (props.height) return height(props)
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
