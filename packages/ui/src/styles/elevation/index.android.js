import PropTypes from 'prop-types'

export default function elevation({elevation}) {
  if (elevation) return {elevation}
}

elevation.propTypes = {elevation: PropTypes.number}
