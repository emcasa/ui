import styled from 'styled-components'
import Input from '../Input'

export default styled(Input).attrs({
  hideErrorView: true,
  hideLabelView: true
})`
  border: none;
  outline: none;
  :focus {
    border: none;
    outline: none;
  }
`
