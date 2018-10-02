import React from 'react'
import PropTypes from 'prop-types'
import View from './styles'

export default (props) => (
  <View {...props}>{props.children}</View>
)

View.propTypes = {
  children: PropTypes.any
}
