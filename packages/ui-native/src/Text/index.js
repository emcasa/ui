import React from 'react'
import {Text as RCTText} from 'react-native'
import styled from 'styled-components/native'
import * as text from '@emcasa/ui/lib/components/Text'

const Text = styled(RCTText)`
  ${text.container};
`

Text.propTypes = {
  ...text.container.propTypes
}

Text.defaultProps = {
  ...text.container.defaultProps
}

Text.displayName = 'Text'

export default Text
