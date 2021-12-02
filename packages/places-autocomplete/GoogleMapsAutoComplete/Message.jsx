import React from 'react'
import styled from 'styled-components'
import {themeGet} from '@styled-system/theme-get'

const Message = styled.span`
  font-family: ${themeGet('fontFamily')};
  font-size: ${themeGet('buttonFontSize.0')}px;
  color: ${({error}) =>
    error ? themeGet('colors.red500') : themeGet('colors.grey900')};
  padding: ${themeGet('space.3')}px;
`

export default Message
