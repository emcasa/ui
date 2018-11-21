import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {withProps} from '@emcasa/ui/lib/utils'
import * as input from '@emcasa/ui/lib/components/Input'
import View from '../View'
import Text from '../Text'

const focused = withProps({focus: true})

const ForwardedInput = React.forwardRef(({area, ...props}, ref) => {
  delete props.fluid
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

const SupportingView = styled(View)`
  height: ${themeGet('space.5')}px;
`

const ErrorText = styled(Text)`
  ${input.error};
`

const Input = React.forwardRef(
  ({hideLabelView, hideErrorView, label, error, ...props}, ref) => {
    return (
      <View>
        {!hideLabelView && (
          <SupportingView>
            <Text inline fontSize="small">
              {label}
            </Text>
          </SupportingView>
        )}
        <TextInput {...props} innerRef={ref} />
        {!hideErrorView && (
          <SupportingView>
            <ErrorText inline fontSize="small">
              {error}
            </ErrorText>
          </SupportingView>
        )}
      </View>
    )
  }
)

Input.propTypes = {
  ...input.container.propTypes,
  ...input.text.propTypes,
  hideLabelView: PropTypes.bool,
  hideErrorView: PropTypes.bool
}

Input.defaultProps = {
  ...input.container.defaultProps,
  ...input.text.defaultProps,
  hideLabelView: false,
  hideErrorView: false
}

export default Input
