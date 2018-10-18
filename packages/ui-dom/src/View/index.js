import styled, {css} from 'styled-components'
import {themeGet} from 'styled-system'
import * as view from '@emcasa/ui/lib/components/View'

const View = styled.div`
  @media only screen and (max-device-width: 600px) {
    ${({body}) =>
      body &&
      css`
        margin-bottom: ${themeGet('space.6')}px;
      `};
    ${({bottom}) =>
      bottom &&
      css`
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: ${themeGet('colors.white')};
      `};
  }
  ${view.container};
`

export default View
