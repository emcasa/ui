import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default (Target) =>
  class RadioButton extends PureComponent {
    static propTypes = {
      onChange: PropTypes.func,
      disabled: PropTypes.bool,
      checked: PropTypes.bool,
      label: PropTypes.string.isRequired,
      value: PropTypes.any
    }

    static defaultProps = {
      onChange: null,
      disabled: false,
      label: null,
      value: null
    }

    state = {
      isControlled: false,
      checked: false
    }

    static getDerivedStateFromProps(props, state) {
      const isControlled = typeof props.checked === 'boolean'
      return {
        isControlled,
        checked: isControlled ? props.checked : state.checked
      }
    }

    onChange = () => {
      const {onChange, disabled, value} = this.props
      if (disabled) return
      this.setState({checked: !this.state.checked}, () => {
        if (onChange)
          onChange(this.state.checked || this.state.isControlled ? value : null)
      })
    }

    render() {
      return <Target {...this.props} {...this.state} onChange={this.onChange} />
    }
  }
