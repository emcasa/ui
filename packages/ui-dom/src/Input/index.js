import React from 'react'
import styled from 'styled-components'
import {withProps} from '@emcasa/ui/lib/utils'
import * as input from '@emcasa/ui/lib/components/Input'

import View from '../View'
import Text from '../Text'

const focused = withProps({focus: true})

const Input = styled(
  ({area, ...props}) => (area ? <textarea {...props} /> : <input {...props} />)
)`
  outline: none;
  :focus {
    ${focused(input.container)};
  }
  ::placeholder {
    ${input.placeholder};
  }
  ${input.container};
  ${input.text};
`

Input.propTypes = {
  ...input.container.propTypes,
  ...input.text.propTypes
}

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
