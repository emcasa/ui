import React, {Component} from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'
import {Background, Container} from './styles'

class ContainerClickOutside extends Component {
  handleClickOutside(e) {
    e.preventDefault()
    this.props.onClose()
  }

  render() {
    return <Container {...this.props} />
  }
}

const EnhancedContainer = enhanceWithClickOutside(ContainerClickOutside)

class Modal extends Component {
  componentDidMount() {
    const html = document.getElementsByTagName('html')[0]
    html.classList.add('js-no-scroll')
  }

  componentWillUnmount() {
    const html = document.getElementsByTagName('html')[0]
    html.classList.remove('js-no-scroll')
  }

  render() {
    return (
      <Background
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        <EnhancedContainer
          onClose={this.props.onClose}
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          {this.props.children}
        </EnhancedContainer>
      </Background>
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  justifyContent: PropTypes.string,
  mobileKeyboard: PropTypes.bool,
  closeIconColor: PropTypes.string
}

export default Modal
