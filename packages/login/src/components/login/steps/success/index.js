import React from 'react'
import PropTypes from 'prop-types'
import Row from '@emcasa/ui-dom/components/Row'
import {
  InfoText,
  TitleText,
  CTAButton,
  IconWrapper
} from '@/components/login/steps/shared/styles'
import {SuccessIcon} from '@/components/shared/SucessIcon'

const Success = ({onContinue}) => {
  if (process.browser) setTimeout(onContinue, 1500)
  return (
    <Row flexDirection="column">
      <IconWrapper>
        <SuccessIcon />
      </IconWrapper>
      <TitleText color="pink">
        Sucesso! Recebemos os seus dados de acesso
      </TitleText>
      <InfoText>Estamos carregando os dados do seu perfil</InfoText>
      <CTAButton fluid active mt={4} onClick={onContinue}>
        Continuar
      </CTAButton>
    </Row>
  )
}

Success.propTypes = {
  onContinue: PropTypes.func.isRequired
}

export default Success
