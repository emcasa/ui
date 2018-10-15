import React from 'react'
import styled from 'styled-components/native'
import * as text from '@emcasa/ui/lib/components/Text'

import {safe} from '../utils'

const Text = styled(safe.Text)`
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
