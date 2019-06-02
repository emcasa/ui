import styled from 'styled-components'
import BaseInput from '@emcasa/ui-dom/components/Input'

export const Input = styled(BaseInput).attrs({
  hideErrorView: true,
  hideLabelView: true
})`
  border: none !important;
  outline: none;
  padding: none;
  &:focus {
    border: none;
  }
`
