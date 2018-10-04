import styled from 'styled-components'
import * as text from '@emcasa/ui/lib/components/text'

const Text = styled.p`
  ${text.container};
`

Text.defaultProps = {
  ...text.container.defaultProps
}

export default Text
