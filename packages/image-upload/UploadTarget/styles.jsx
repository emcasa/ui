import React from 'react'
import styled from 'styled-components'
import Text from '@emcasa/ui-dom/components/Text'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Card from '../Card'
import {SpinnerSVG} from '../../places-autocomplete/GoogleMapsAutoComplete/Spinner'
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

export const Spinner = styled(({className, style}) => (
  <div className={className} style={style}>
    <SpinnerSVG />
  </div>
))`
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    display: flex;
  }
`
