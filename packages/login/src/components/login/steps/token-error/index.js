import React from 'react'
import PropTypes from 'prop-types'
import Row from '@emcasa/ui-dom/components/Row'
import {
  InfoText,
  TitleText,
  CTAButton,
  IconWrapper
} from '@/components/login/steps/shared/styles'
import {ExclamationIcon} from '@/components/shared/ExclamationIcon'
import Login from '@/components/login'

const TokenError = ({goToStep}) => (
  <Row flexDirection="column">
    <IconWrapper>
      <ExclamationIcon />
    </IconWrapper>
    <TitleText color="pink">Ocorreu um erro ao receber os seus dados</TitleText>
    <InfoText>Tente enviar o seu código de acesso novamente</InfoText>
    <CTAButton
      fluid
      active
      mt={4}
      onClick={() => goToStep(Login.STEP_NAMES.token)}
    >
      Tentar novamente
    </CTAButton>
  </Row>
)

TokenError.propTypes = {
  goToStep: PropTypes.func.isRequired
}

export default TokenError
