import PropTypes from 'prop-types'

export default function elevation({
  elevation,
  theme: {shadows, shadowOpacity}
}) {
  if (!elevation) return
  const shadow = shadows[elevation].umbra
  const {max, abs} = Math
  return `
  shadow-color: black;
  shadow-opacity: ${shadowOpacity.umbra + abs(shadow.spread) / 100};
  shadow-radius: ${max(1, shadow.radius - abs(shadow.spread) / 50)}px;
  shadow-offset: ${shadow.x}px ${shadow.y}px;
  `
}

elevation.propTypes = {elevation: PropTypes.number}
