import React from 'react'
import styled from 'styled-components'
import {withProps} from '@emcasa/ui/lib/utils'
import * as input from '@emcasa/ui/lib/components/Input'
import Text from '../Text'

const focused = withProps({focus: true})

const TextInput = styled(
  ({area, ...props}) => (area ? <textarea {...props} /> : <input {...props} />)
)`
  ${input.container};
  ${input.text};
  :focus {
    ${focused(input.container)};
  }
  ::placeholder {
    ${input.placeholder};
  }
`

export default function Input(props) {
  return (
    <div>
      {props.label && (
        <Text inline fontSize="small">
          {props.label}
        </Text>
      )}
      <TextInput {...props} />
    </div>
  )
}

Input.propTypes = {
  ...input.container.propTypes,
  ...input.text.propTypes
}

Input.defaultProps = {
  ...input.container.defaultProps,
  ...input.text.defaultProps
}
