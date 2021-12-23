import React from 'react'
import styled from 'styled-components'
import {themeGet} from '@styled-system/theme-get'
import {optionStyles, LeadingIcon} from './Option'

const Wrapper = styled.p`
  ${optionStyles}
  margin: 0;
  font-size: ${themeGet('fontSizes.1')}px;
  color: ${({error, success}) =>
    error
      ? themeGet('colors.red500')
      : success
      ? themeGet('colors.green500')
      : themeGet('colors.grey500')};
`

const Message = ({children, error, success, iconProps}) => {
  const messageProps = {
    error,
    success
  }
  return (
    <Wrapper role="option" {...messageProps}>
      {iconProps && <LeadingIcon {...iconProps} />}
      {children}
    </Wrapper>
  )
}

export default Message
