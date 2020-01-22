import styled from 'styled-components'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import themeGet from '@styled-system/theme-get'
import Input from "@emcasa/ui-dom/components/Input";

export const CTAButton = styled(Button)`
  border-color: ${({active, selected, disabled, theme: {colors}}) =>
    (active || selected) && !disabled ? colors.pink : colors.darkSmoke};
  background-color: ${({active, disabled, theme: {colors}}) =>
    active && !disabled ? colors.pink : colors.darkSmoke};
  color: ${({active, disabled, theme: {colors}}) => {
    if (disabled || active) return colors.white
    else return colors.dark
  }};
`

export const TitleText = styled(Text)`
  font-weight: 600;
  margin: 0px 0px 5px 0px;
`

export const InfoText = styled(Text)`
  margin: 0px;
  color: #4f4f4f;
  font-size: 16px;
`

export const IconWrapper = styled.div`
  margin-bottom: ${themeGet('space.4')}px;
`
export const CenterInput = styled(Input)`
  text-align: center;
`
