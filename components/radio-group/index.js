import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({
      selectedValue: value
    })
    
    const {onChange} = this.props
    if (onChange) {
      onChange(value)
    }
  }

  render() {
    const {children} = this.props
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        onChange: this.onChange,
        selectedValue: this.state.selectedValue
      })
    )
    
    return (
      <div>
        {childrenWithProps}
      </div>
    )
  }
}

RadioGroup.propTypes = {
  children: PropTypes.node
}

export default RadioGroup
