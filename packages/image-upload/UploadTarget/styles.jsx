import React from 'react'
import styled from 'styled-components'
import Text from '@emcasa/ui-dom/components/Text'
import {breakpoint} from '@emcasa/ui/lib/styles'
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
  ${Text} {
    margin: 0 4px;
  }
  @media ${breakpoint.down('tablet')} {
    ${Text} {
      display: none;
    }
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
