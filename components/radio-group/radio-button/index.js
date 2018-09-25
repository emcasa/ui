import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Checked, Unchecked} from './styles'

class RadioButton extends Component {
  render() {
    const {selectedValue, value, onChange} = this.props
    const checked = selectedValue === value
    const radioComponent = checked ? <Checked {...this.props} /> : <Unchecked {...this.props} />

    return (
      <div name={name} onClick={() => {onChange(value)}} >
        {radioComponent}
        <label>{this.props.label}</label>
      </div>
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
