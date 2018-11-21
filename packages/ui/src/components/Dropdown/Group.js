import React, {PureComponent, Fragment} from 'react'
import Group from '../Group'
import {propTypes} from './index'

export default ({DropdownButton, DropdownContainer}) => (Target) =>
  Group(({onSelect, selected}) => ({
    onSelect,
    selected
  }))(
    class Dropdown extends PureComponent {
      static propTypes = propTypes

      static defaultProps = {
        height: 'tall',
        containerProps: {}
      }

      state = {focused: false}

      target = React.createRef()

      get label() {
        const {label, placeholder, children, selectedValue} = this.props
        if (label) return label
        if (selectedValue === undefined) return placeholder
        const selectedNode = children.find((node) => node.props.selected)
        return selectedNode.props.label || selectedNode.props.children
      }

      get _buttonProps() {
        const {...props} = this.props
        const {focused} = this.state
        delete props.renderButton, props.renderItem, props.onChange
        return {
          ...props,
          focused,
          onFocusChange: focused ? this.onBlur : this.onFocus
        }
      }

      get _containerProps() {
        const {width, containerProps} = this.props
        const {focused, target} = this.state
        return {
          width,
          ...containerProps,
          focused,
          target,
          onDropdownBlur: this.onBlur,
          onDropdownFocus: this.onFocus
        }
      }

      onFocus = () => this.setState({focused: true}, this.props.onFocus)

      onBlur = () => this.setState({focused: false}, this.props.onBlur)

      renderButton() {
        const {renderButton} = this.props
        if (renderButton) return renderButton(this._buttonProps)
        return (
          <DropdownButton {...this._buttonProps}>{this.label}</DropdownButton>
        )
      }

      render() {
        const {children} = this.props
        return (
          <Target
            ref={(target) => this.setState({target})}
            focused={this.state.focused}
          >
            {this.renderButton()}
            <DropdownContainer {...this._containerProps}>
              {children}
            </DropdownContainer>
          </Target>
        )
      }
    }
  )
