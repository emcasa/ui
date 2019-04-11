import React from 'react'
import styled from 'styled-components'
import {withProps} from '@emcasa/ui/lib/utils'
import * as input from '@emcasa/ui/lib/components/Input'
import Field from '../Field'

const focused = withProps({focus: true})

const ForwardedInput = React.forwardRef(({area, ...props}, ref) => {
  delete props.fluid
  delete props.focus
  return area ? (
    <textarea ref={ref} {...props} />
  ) : (
    <input ref={ref} {...props} />
  )
})

const TextInput = styled(ForwardedInput)`
  -webkit-font-smoothing: antialiased;
  display: block;
  box-sizing: border-box;
  width: ${({fluid}) => (fluid ? '100%' : 'auto')};
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

const Input = <Field Component={TextInput} />

Input.propTypes = {
  ...input.container.propTypes,
  ...input.text.propTypes
}

Input.defaultProps = {
  ...input.container.defaultProps,
  ...input.text.defaultProps
}

export default Input
