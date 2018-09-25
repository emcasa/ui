import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './styles'

export default (props) => (
  <Button {...props}>
    {props.children}
  </Button>
)

Button.propTypes = {
  children: PropTypes.element.isRequired
}
