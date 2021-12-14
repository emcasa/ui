import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import {themeGet} from '@styled-system/theme-get'
import theme from '@emcasa/ui'
import {container} from '@emcasa/ui/lib/components/Dropdown'

const MAX_HEIGHT = theme.buttonHeight[0] * 4 + theme.buttonHeight[0] / 2

const Listbox = styled.ul`
  z-index: 2;
  position: absolute;
  left: 0;
  top: calc(100% + ${themeGet('space.1')}px);
  width: 100%;
  overflow-y: auto;
  max-height: ${({focused}) => (focused ? MAX_HEIGHT : '0')}px;
  pointer-events: ${({focused}) => (focused ? 'initial' : 'none')};
  opacity: ${({focused}) => (focused ? '1' : '0')};
  transform: ${({focused}) =>
    focused ? 'translateY(0)' : 'translateY(-12px)'};
  transition: opacity ${({focused}) => (focused ? '0.2s' : '0.15s')} linear,
    transform 0.5s cubic-bezier(0.4, 0.2, 0, 1),
    max-height ${({focused}) => (focused ? '0s' : '0.5s cubic-bezier(0.4, 0.2, 0, 1)')};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${themeGet('colors.white')};
  border: 1px solid ${themeGet('colors.grey300')};
  border-radius: 8px;
  box-shadow: 0 8px 14px rgba(131, 145, 165, 0.2);
  margin: 0;
  padding: 0;
  &:focus {
    outline: none;
  }
`

export default class DropdownContainer extends PureComponent {
  static propTypes = container.propTypes

  get targetDOMNode() {
    return this.props.target
      ? ReactDOM.findDOMNode(this.props.target)
      : undefined
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick)
    document.addEventListener('touchend', this.onDocumentClick)
    document.addEventListener('focus', this.onDocumentFocus, true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick)
    document.removeEventListener('touchend', this.onDocumentClick)
    document.removeEventListener('focus', this.onDocumentFocus, true)
  }

  onDocumentClick = (e) => {
    const {focused, onDropdownBlur} = this.props
    const target = this.targetDOMNode
    if (
      focused &&
      target &&
      onDropdownBlur &&
      target &&
      !target.contains(e.target)
    ) {
      onDropdownBlur()
    }
  }

  onDocumentFocus = (e) => {
    const {focused, onDropdownBlur, onDropdownFocus} = this.props
    const target = this.targetDOMNode
    if (focused && target && !target.contains(e.target)) onDropdownBlur()
    else if (!focused && target && target.contains(e.target)) onDropdownFocus()
  }

  render() {
    const {children, dropdownId, focused} = this.props
    return (
      <Listbox
        id={`${dropdownId}list`}
        focused={focused}
        tabIndex="-1"
        role="listbox"
        aria-labelledby="exp_elem"
      >
        {children}
      </Listbox>
    )
  }
}
