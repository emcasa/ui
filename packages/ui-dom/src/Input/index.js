import React from 'react'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {withProps} from '@emcasa/ui/lib/utils'
import * as input from '@emcasa/ui/lib/components/Input'
import View from '../View'
import Text from '../Text'

const focused = withProps({focus: true})

const TextInput = styled(
  ({area, fluid, ...props}) =>
    area ? <textarea {...props} /> : <input {...props} />
)`
  -webkit-font-smoothing: antialiased;
  display: block;
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

const LabelView = styled(View)`
  height: ${themeGet('space.5')}px;
`

export default function Input(props) {
  return (
    <View>
      <LabelView>
        <Text inline fontSize="small">
          {props.label}
        </Text>
      </LabelView>
      <TextInput {...props} />
    </View>
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
