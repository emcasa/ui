import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Row from '@emcasa/ui-dom/components/Row'
import InputMask from 'react-input-mask'
import {
  InfoText,
  TitleText,
  CTAButton,
  CenterInput
} from '@/components/login/steps/shared/styles'
import Loading from '@/components/login/steps/loading'
import Login from '@/components/login'

class Phone extends Component {
  static ERROR_MESSAGES = {
    invalidPhone: 'Por favor, entre com um número de telefone válido',
    apiError: 'Ocorreu um erro! Por favor, tente novamente!'
  }

  constructor(props) {
    super(props)

    this.state = {
      phone: props.phone,
      errorMessage: null,
      isLoading: false
    }
  }

  phoneInput = React.createRef()

  componentDidMount() {
    this.phoneInput.current.focus()
  }

  onKeyPressed = ({keyCode}) => {
    if (keyCode === 13) {
      this.onSubmit()
      return false
    }
  }

  changePhone = (event) => {
    const {value} = event.target
    if (this.state.errorMessage) {
      this.setState({errorMessage: null})
    }
    this.setState({phone: value})
  }

  clearPhone = (phone) => {
    const charsToClean = [' ', '(', ')', '-', '_']
    let newPhone = phone
    charsToClean.forEach((char) => {
      newPhone = newPhone.split(char).join('')
    })
    return newPhone
  }

  requestToken = (phone) => {
    this.setState({isLoading: true})
    this.props
      .requestToken(phone)
      .then(() => this.props.goToStep(Login.STEP_NAMES.token))
      .catch(() =>
        this.setState({
          isLoading: false,
          errorMessage: Phone.ERROR_MESSAGES.apiError
        })
      )
  }

  onSubmit = () => {
    if (this.state.errorMessage) {
      this.setState({errorMessage: null})
    }

    const cleanPhone = this.clearPhone(this.state.phone)
    if (cleanPhone.length !== 11) {
      this.setState({errorMessage: Phone.ERROR_MESSAGES.invalidPhone})
    } else {
      this.requestToken(cleanPhone)
    }
  }

  isButtonDisabled = () => {
    return this.clearPhone(this.state.phone).length !== 11
  }

  renderForm = () => (
    <Row flexDirection="column">
      <TitleText color="pink">{this.props.title}</TitleText>
      {this.props.renderInfo() || (
        <InfoText>
          Entre com o seu celular. Enviaremos o código de acesso no seu WhatsApp
        </InfoText>
      )}
      <InputMask
        mask="(99) 99999-9999"
        value={this.state.phone}
        onChange={this.changePhone}
        onKeyDown={this.onKeyPressed}
      >
        <CenterInput
          height="medium"
          mt="16px"
          mb={2}
          pattern="\d*"
          inputMode="numeric"
          placeholder="(11) 99999-9999"
          hideLabelView
          error={this.state.errorMessage}
          ref={this.phoneInput}
        />
      </InputMask>
      <CTAButton
        fluid
        active
        onClick={this.onSubmit}
        disabled={this.isButtonDisabled()}
      >
        Entrar
      </CTAButton>
    </Row>
  )

  render() {
    return this.state.isLoading ? <Loading /> : this.renderForm()
  }
}

Phone.propTypes = {
  requestToken: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  renderInfo: PropTypes.func.isRequired
}

export default Phone
