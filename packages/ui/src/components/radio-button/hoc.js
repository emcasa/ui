import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default (Target) =>
  class RadioButton extends PureComponent {
    static propTypes = {
      onChange: PropTypes.func,
      disabled: PropTypes.bool,
      checked: PropTypes.bool,
      label: PropTypes.string.isRequired,
      value: PropTypes.string
    }

    static defaultProps = {
      onChange: null,
      disabled: false,
      label: null,
      value: null
    }

    state = {
      checked: false
    }

    static getDerivedStateFromProps(props, state) {
      return {
        checked:
          typeof props.checked === 'boolean' ? props.checked : state.checked
      }
    }

    onChange = (checked = undefined) => {
      const {onChange, disabled, value} = this.props
      if (disabled) return
      const nextValue = () =>
        typeof checked === 'boolean' ? checked : !this.state.checked
      this.setState({checked: nextValue()}, () => {
        if (onChange) onChange(this.state.checked ? value : null)
      })
    }

    render() {
      return <Target {...this.props} {...this.state} onChange={this.onChange} />
    }
  }
