import PropTypes from 'prop-types'

const shadowCss = ({x, y, radius, spread}) =>
  `${x}px ${y}px ${radius}px ${spread}px`

const shadowLayers = ({elevation, theme: {shadows, shadowOpacity}}) =>
  Object.entries(shadows[elevation]).map(
    ([layer, offset]) =>
      `${shadowCss(offset)} rgba(0,0,0,${shadowOpacity[layer]})`
  )

export default function elevation(props) {
  if (props.elevation) return `box-shadow: ${shadowLayers(props).join(',')};`
}

elevation.propTypes = {elevation: PropTypes.number}
