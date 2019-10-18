import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import {container} from '@emcasa/ui/lib/components/Dropdown'

export default styled(
  class DropdownContainer extends PureComponent {
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
      if (focused && target && onDropdownBlur && target && !target.contains(e.target)) {
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
      const {children, id, className, style} = this.props
      return (
        <div tabIndex="-1" id={id} className={className} style={style}>
          {children}
        </div>
      )
    }
  }
)`
  z-index: -1;
  position: absolute;
  top: 100%;
  width: 100%;
  overflow-y: auto;
  ${container};
  ${container.contentContainer};
  display: ${({focused}) => (focused ? 'flex' : 'none')};
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`
