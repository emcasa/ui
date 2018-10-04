import React from 'react'
import pick from 'lodash.pick'

import Button, {ButtonText} from './styles'

export default ({children, ...props}) => (
  <Button {...props}>
    <ButtonText {...pick(props, ['active', 'disabled'])}>{children}</ButtonText>
  </Button>
)
