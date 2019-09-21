import React from 'react'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import PulseLoader from 'react-spinners/PulseLoader'
import Card from '../Card'

export const UploadCard = styled(Card)`
  ${({isActive}) =>
    isActive && {
      transform: 'scale(1.05)'
    }};
  outline: none;
  background: white;
  * {
    cursor: pointer;
  }
`

export const Spinner = styled(({className, style, ...props}) => (
  <div className={className} style={style}>
    <PulseLoader {...props} />
  </div>
)).attrs(({theme}) => ({
  size: 6,
  color: theme.colors['pink']
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    display: flex;
  }
`
