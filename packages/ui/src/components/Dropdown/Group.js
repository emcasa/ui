import React, {PureComponent} from 'react'
import uniqueId from 'lodash/uniqueId'
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
        blurOnChange: true,
        height: 'tall',
        containerProps: {},
        buttonProps: {},
        dropdownId: uniqueId('ecDropdown')
      }

      state = {
        layout: undefined,
        focused: false
      }

      static getDerivedStateFromProps(props) {
        if (typeof props.focused !== 'undefined')
          return {focused: Boolean(props.focused)}
        return null
      }

      get label() {
        const {label, placeholder, children, selectedValue} = this.props
        if (label) return label
        const selectedNode = children.find((node) => node.props.selected)
        if (selectedValue === undefined || !selectedNode) return placeholder
        return selectedNode.props.label || selectedNode.props.children
      }

      get _buttonProps() {
        const {buttonProps, dropdownId, ...props} = this.props
        const {focused} = this.state
        delete props.renderButton
        delete props.renderItem
        delete props.onChange
        delete props.initialValue
        delete props.style
        delete props.className
        return {
          ...props,
          ...buttonProps,
          dropdownId: dropdownId,
          focused,
          isPlaceholder: Boolean(!props.label && !props.selectedValue),
          onFocusChange: focused ? this.onBlur : this.onFocus,
          onLayout: this.onLayout
        }
      }

      get _containerProps() {
        const {width, containerProps, dropdownId} = this.props
        const {focused, target, layout} = this.state
        return {
          width,
          ...containerProps,
          dropdownId: dropdownId,
          focused,
          target,
          layout,
          onDropdownBlur: this.onBlur,
          onDropdownFocus: this.onFocus
        }
      }

      onLayout = (layout) => this.setState({layout})

      onFocus = () => this.setState({focused: true}, this.props.onFocus)

      onBlur = () => this.setState({focused: false}, this.props.onBlur)

      renderItem = (node) =>
        React.cloneElement(node, {
          onSelect: () => {
            node.props.onSelect()
            if (this.props.blurOnChange) setTimeout(() => this.onBlur(), 0)
          }
        })

      renderButton() {
        const {renderButton} = this.props
        if (renderButton) return renderButton(this._buttonProps)
        return (
          <DropdownButton {...this._buttonProps}>{this.label}</DropdownButton>
        )
      }

      render() {
        const {children, zIndex, width, style, className} = this.props
        return (
          <Target
            zIndex={zIndex}
            width={width}
            style={style}
            className={className}
            ref={(target) => this.setState({target})}
            focused={this.state.focused}
          >
            {this.renderButton()}
            <DropdownContainer {...this._containerProps}>
              {React.Children.map(children, this.renderItem)}
            </DropdownContainer>
          </Target>
        )
      }
    }
  )
