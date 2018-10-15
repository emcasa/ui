import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default (Target) =>
  class RadioGroup extends PureComponent {
    static propTypes = {
      children: PropTypes.node.isRequired,
      selectedValue: PropTypes.any,
      disabled: PropTypes.bool,
      onChange: PropTypes.func
    }

    state = {
      selectedValue: false
    }

    static getDerivedStateFromProps(props, state) {
      const isControlled = typeof props.selectedValue !== 'undefined'
      return {
        isControlled,
        selectedValue: isControlled
          ? props.selectedValue
          : state.selectedValue || props.initialValue
      }
    }

    onChange = (value) => {
      const {disabled} = this.props
      if (disabled) return
      const selectedValue = value
      const onChange = () => {
        if (this.props.onChange) this.props.onChange(selectedValue)
      }
      if (this.state.isControlled) onChange()
      else this.setState({selectedValue}, onChange)
    }

    get buttonProps() {
      const {disabled} = this.props
      const props = {onChange: this.onChange}
      if (typeof disabled === 'boolean') props.disabled = disabled
      return props
    }

    renderChildren() {
      return React.Children.map(
        this.props.children,
        (child) =>
          child &&
          React.cloneElement(child, {
            ...this.buttonProps,
            checked: child.props.value === this.state.selectedValue
          })
      )
    }

    render() {
      return (
        <Target {...this.props} {...this.state}>
          {this.renderChildren()}
        </Target>
      )
    }
  }
