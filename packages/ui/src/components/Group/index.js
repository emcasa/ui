import _ from 'lodash'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

const Group = (parseProps) => (Target) =>
  class SelectGroup extends PureComponent {
    static propTypes = {
      children: PropTypes.node.isRequired,
      selectedValue: PropTypes.any,
      disabled: PropTypes.bool,
      onChange: PropTypes.func,
      OptionWrapper: PropTypes.any
    }

    state = {
      selectedValue: false
    }

    static getDerivedStateFromProps(props, state) {
      const isControlled = typeof props.selectedValue !== 'undefined'
      let initialValue = props.initialValue
      if (props.multi) initialValue = _.toArray(initialValue)
      return {
        isControlled,
        selectedValue: isControlled
          ? props.selectedValue
          : state.selectedValue || initialValue
      }
    }

    isSelected(value) {
      const {multi} = this.props
      const {selectedValue} = this.state
      if (!multi) return selectedValue === value
      else return selectedValue.indexOf(value) !== -1
    }

    _select(value) {
      const {multi} = this.props
      const selectedValue = this.state.selectedValue.slice(0)
      let index = multi && selectedValue.indexOf(value)
      if (!multi) return value
      else if (index === -1) selectedValue.push(value)
      else selectedValue.splice(index, 1)
      return selectedValue
    }

    clear() {
      const {initialValue} = this.state
      this.setState({selectedValue: initialValue})
    }

    onChange = (value) => {
      const {disabled} = this.props
      if (disabled) return
      const selectedValue = this._select(value)
      const onChange = () => {
        if (this.props.onChange) this.props.onChange(selectedValue)
      }
      if (this.state.isControlled) onChange()
      else this.setState({selectedValue}, onChange)
    }

    renderChild(child) {
      const {OptionWrapper} = this.props
      if (!child) return
      const component = React.cloneElement(
        child,
        parseProps(
          {
            ...this.props,
            onSelect: this.onChange,
            selected: this.isSelected(child.props.value)
          },
          child
        )
      )
      if (OptionWrapper) return <OptionWrapper>{component}</OptionWrapper>
      return component
    }

    render() {
      return (
        <Target {...this.props} {...this.state}>
          {React.Children.map(this.props.children, (child) =>
            this.renderChild(child)
          )}
        </Target>
      )
    }
  }

export default Group
