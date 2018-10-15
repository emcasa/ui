import PropTypes from 'prop-types'
import {css} from 'styled-components'
import {space} from 'styled-system'

import {ICON_SIZE} from '../../theme/measures'

export {default} from './hoc'

export const container = css`
  ${space};
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
