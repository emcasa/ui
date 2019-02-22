import styled from 'styled-components'
import {breakpoint} from '@emcasa/ui/lib/styles'
import {themeGet} from 'styled-system'
import TextBase from '@emcasa/ui-dom/components/Text'

export const Text = styled(TextBase)`
  @media only screen and ${breakpoint.only('phone')} {
    font-style: italic;
  }
  @media only screen and ${breakpoint.down('tablet')} {
    color: ${themeGet('colors.pink')};
  }
  @media only screen and ${breakpoint.up('desktop')} {
    color: ${themeGet('colors.blue')};
  }
`
