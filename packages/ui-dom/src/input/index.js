import React from 'react'
import styled from 'styled-components'
import * as input from '@emcasa/ui/lib/components/Input'

import View from '../view'
import Text from '../text'

const Input = styled.input`
  ${input.container};
  ${input.text};
  :focus {
    ${input.container.withProps({focus: true})};
  }
  ::placeholder {
    ${input.placeholder};
  }
`

Input.defaultProps = {
  ...input.container.defaultProps,
  ...input.text.defaultProps
}

export default (props) => {
  return (
    <View>
      {props.label && <Text>{props.label}</Text>}
      <Input {...props} />
    </View>
  )
}
