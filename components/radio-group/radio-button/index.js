import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Container, Label, Checked, Unchecked} from './styles'

class RadioButton extends Component {
  render() {
    const {selectedValue, value, onChange, disabled} = this.props
    const checked = selectedValue === value
    const radioComponent = checked ? <Checked {...this.props} /> : <Unchecked {...this.props} />

    return (
      <Container
        name={name}
        onClick={() => {if (!disabled) onChange(value)}}
        disabled={disabled}
        checked={checked}
      >
        {radioComponent}
        <Label disabled={disabled}>{this.props.label}</Label>
      </Container>
    )
  }
}

RadioButton.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.string
}

RadioButton.defaultProps = {
  onChange: null,
  disabled: false,
  label: null,
  value: null
}

export default RadioButton
