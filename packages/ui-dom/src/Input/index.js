import React from 'react'
import styled from 'styled-components'
import {withProps} from '@emcasa/ui/lib/utils'
import * as input from '@emcasa/ui/lib/components/Input'

import View from '../View'
import Text from '../Text'

const focused = withProps({focus: true})

const Input = styled((props) => {
  const domProps = Object.assign({}, props)
  delete domProps.area
  delete domProps.fluid
  return props.area ? <textarea {...domProps}></textarea> : <input {...domProps}/>
})`
  ${input.container};
  ${input.text};
  :focus {
    ${focused(input.container)};
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
      {props.label && <Text inline fontSize="small">{props.label}</Text>}
      <Input {...props} />
    </View>
  )
}
