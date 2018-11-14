import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import {container} from '@emcasa/ui/lib/components/Dropdown'

export default styled(
  class DropdownContainer extends PureComponent {
    static propTypes = container.propTypes

    componentDidMount() {
      document.addEventListener('click', this.onDocumentClick, false)
      document.addEventListener('touchend', this.onDocumentClick, false)
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.onDocumentClick, false)
      document.removeEventListener('touchend', this.onDocumentClick, false)
    }

    onDocumentClick = (e) => {
      const {target, focused, onDropdownBlur} = this.props
      if (
        focused &&
        target &&
        onDropdownBlur &&
        !ReactDOM.findDOMNode(target).contains(e.target)
      ) {
        onDropdownBlur()
      }
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
  ${container};
  padding-top: 10px;
`
