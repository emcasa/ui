import React, {Component} from 'react'
import Row from '@emcasa/ui-dom/components/Row'
import InputMask from 'react-input-mask'
import {BackButton} from '@/components/login/steps/token/styles'
import {
  CenterInput,
  CTAButton,
  InfoText,
  TitleText
} from '@/components/login/steps/shared/styles'
import Login from '@/components/login'
import Loading from '@/components/login/steps/loading'

class Token extends Component {
  static ERROR_MESSAGES = {
    invalidToken: 'Por favor, entre com um token de 6 digitos'
  }

  constructor(props) {
    super(props)

    this.state = {
      token: '',
      errorMessage: null,
      isLoading: false
    }
  }

  changeToken = (event) => {
    const {value} = event.target
    if (this.state.errorMessage) {
      this.setState({errorMessage: null})
    }
    this.setState({token: value})
  }

  clearToken = (phone) => {
    const charsToClean = [' ', '_']
    let newPhone = phone
    charsToClean.forEach((char) => {
      newPhone = newPhone.split(char).join('')
    })
    return newPhone
  }

  submitToken = (token) => {
    this.setState({isLoading: true})
    this.props
      .submitToken(token)
      .then(() => this.props.goToStep(Login.STEP_NAMES.success))
      .catch(() => this.props.goToStep(Login.STEP_NAMES.tokenError))
  }

  onSubmit = () => {
    if (this.state.errorMessage) {
      this.setState({errorMessage: null})
    }

    const cleanToken = this.clearToken(this.state.token)
    if (cleanToken.length !== 4) {
      this.setState({errorMessage: Token.ERROR_MESSAGES.invalidToken})
    } else {
      this.submitToken(cleanToken)
    }
  }

  isButtonDisabled = () => {
    return this.clearToken(this.state.token).length !== 4
  }

  onBack = () => this.props.goToStep(Login.STEP_NAMES.phone)

  renderForm() {
    return (
      <Row flexDirection="column">
        <TitleText color="pink">Código enviado</TitleText>
        <InfoText>Digite o código enviado para o seu Whatsapp</InfoText>
        <InputMask mask="9 9 9 9" onChange={this.changeToken}>
          <CenterInput
            height="medium"
            mt={4}
            mb={2}
            placeholder="9 9 9 9"
            pattern="\d*"
            hideLabelView
          />
        </InputMask>
        <Row>
          <BackButton mr={3} onClick={this.onBack}>
            Voltar
          </BackButton>
          <CTAButton
            fluid
            active
            disabled={this.isButtonDisabled()}
            onClick={this.onSubmit}
          >
            Enviar
          </CTAButton>
        </Row>
      </Row>
    )
  }

  render() {
    return this.state.isLoading ? <Loading /> : this.renderForm()
  }
}

export default Token
