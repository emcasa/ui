import React, {Component, Fragment} from 'react'
import Modal from '@/components/shared/Modal'
import Row from '@emcasa/ui-dom/components/Row'
import Header from '@/components/login/header'
import Phone from '@/components/login/steps/phone'
import Token from '@/components/login/steps/token'
import Success from '@/components/login/steps/success'
import TokenError from '@/components/login/steps/token-error'
import PropTypes from 'prop-types'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'

class Login extends Component {
  static STEP_NAMES = {
    phone: 'phone',
    token: 'token',
    tokenError: 'tokenError',
    success: 'success',
    loading: 'loading'
  }

  static INITIAL_STATE = {
    currentStep: Login.STEP_NAMES.phone,
    phone: '',
    isOpen: false
  }

  state = {...Login.INITIAL_STATE}

  onClose = () => {
    this.setState({...Login.INITIAL_STATE})
  }
  open = () => this.setState({isOpen: true})

  goToStep = (stepName) => this.setState({currentStep: stepName})

  requestToken = (phone) => {
    this.setState({phone: phone})
    const {requestToken, onError} = this.props
    return requestToken(phone, onError)
  }

  submitToken = (token) => {
    const {submitToken, onSuccess, onError} = this.props
    return submitToken(this.state.phone, token, onSuccess, onError)
  }

  renderStepByState = () => {
    switch (this.state.currentStep) {
      case Login.STEP_NAMES.phone:
        return (
          <Phone
            phone={this.state.phone}
            requestToken={this.requestToken}
            goToStep={this.goToStep}
          />
        )
      case Login.STEP_NAMES.token:
        return <Token submitToken={this.submitToken} goToStep={this.goToStep} />
      case Login.STEP_NAMES.success:
        return <Success onContinue={this.onClose} />
      case Login.STEP_NAMES.tokenError:
        return <TokenError goToStep={this.goToStep} />
    }
  }

  renderIsOpen = () => (
    <Fragment>
      {this.props.children({open: this.open, close: this.onClose})}
      <Modal onClose={this.onClose}>
        <Row p="30px" height="280px" flexDirection="column">
          <Header onClose={this.onClose} />
          <Row justifyContent="center" alignItems="center" height="100%">
            {this.renderStepByState()}
          </Row>
        </Row>
      </Modal>
    </Fragment>
  )

  renderIsClosed = () =>
    this.props.children({open: this.open, close: this.onClose})

  render() {
    return this.state.isOpen ? this.renderIsOpen() : this.renderIsClosed()
  }
}

Login.defaultProps = {
  submitToken: () =>
    new Promise((_resolve, reject) => {
      window.setTimeout(_resolve, 1000)
    }),
  requestToken: () =>
    new Promise((resolve) => {
      window.setTimeout(resolve, 500)
    }),
  children: ({open, close}) => {
    return (
      <div>
        <Text>OLAR</Text>
        <Button onClick={open}>Open</Button>
      </div>
    )
  }
}

Login.propTypes = {
  submitToken: PropTypes.func.isRequired,
  requestToken: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  children: PropTypes.func
}

export default Login
