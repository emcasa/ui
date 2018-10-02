import React from 'react'
import PropTypes from 'prop-types'
import Button from './styles'

export default (props) => (
  <Button {...props}>
    {props.children}
  </Button>
)

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func
}
