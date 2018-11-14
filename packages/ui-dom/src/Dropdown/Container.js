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
      document.addEventListener('click', this.onDocumentClick, false)
      document.addEventListener('touchend', this.onDocumentClick, false)
      document.addEventListener('focus', this.onDocumentFocus, true)
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.onDocumentClick, false)
      document.removeEventListener('touchend', this.onDocumentClick, false)
      document.removeEventListener('focus', this.onDocumentFocus, true)
    }

    onDocumentClick = (e) => {
      const {focused, onDropdownBlur} = this.props
      const target = this.targetDOMNode
      if (focused && target && onDropdownBlur && !target.contains(e.target)) {
        onDropdownBlur()
      }
    }

    onDocumentFocus = (e) => {
      const {focused, onDropdownBlur, onDropdownFocus} = this.props
      const target = this.targetDOMNode
      if (focused && !target.contains(e.target)) onDropdownBlur()
      else if (!focused && target.contains(e.target)) onDropdownFocus()
    }

    render() {
      const {children, id, className, style} = this.props
      return (
        <div id={id} className={className} style={style}>
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
  margin-top: -4px;
  overflow-y: auto;
  ${container};
  padding-top: 10px;
`
