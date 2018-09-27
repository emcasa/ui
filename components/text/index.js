import React from 'react'
import PropTypes from 'prop-types'
import Text from './styles'

export default (props) => (
  <Text {...props}>{props.children}</Text>
)

Text.propTypes = {
  children: PropTypes.any
}
