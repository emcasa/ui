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

    select(value) {
      const {multi} = this.props
      let {selectedValue} = this.state
      if (!multi) selectedValue = value
      else if (selectedValue.indexOf(value) === -1) selectedValue.push(value)
      this.setState({selectedValue})
    }

    descelect(value) {
      const {multi} = this.props
      let {selectedValue} = this.state
      let index
      if (!multi && selectedValue == value) selectedValue = undefined
      else if (multi && (index = selectedValue.indexOf(value)) !== -1)
        selectedValue.splice(index, 1)
      this.setState({selectedValue})
    }

    clear() {
      const {initialValue} = this.state
      this.setState({selectedValue: initialValue})
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

    renderChild(child) {
      const {OptionWrapper} = this.props
      if (!child) return
      const component = React.cloneElement(
        child,
        parseProps(
          {
            ...this.props,
            onSelect: this.onChange,
            selected: child.props.value === this.state.selectedValue
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
