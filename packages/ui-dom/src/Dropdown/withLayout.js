import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'

export default (Target) =>
  class extends PureComponent {
    componentDidMount() {
      document.addEventListener('click', this.onDocumentClick, false)
      document.addEventListener('touchend', this.onDocumentClick, false)
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.onDocumentClick, false)
      document.removeEventListener('touchend', this.onDocumentClick, false)
    }

    onDocumentClick = (e) => {
      const {target, onBlur} = this.props
      console.log(target, e.target)
      if (target && onBlur && !target.contains(e.target)) {
        // onBlur()
      }
    }

    render() {
      return <Target {...this.props} {...this.state} />
    }
  }
