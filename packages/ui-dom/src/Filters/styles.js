import styled from 'styled-components'
import {themeGet, color, borderColor, zIndex} from 'styled-system'
import Button from '../Button'
import View from '../View'
import Row from '../Row'

export const FilterButton = styled(Button).attrs({type: 'button'})`
  ${borderColor};
  ${color};
`

export const Panel = styled(View).attrs({elevation: 2})`
  position: absolute;
  border-radius: 4px;
  margin-top: ${themeGet('space.2')}px;
  padding: ${themeGet('space.3')}px ${themeGet('space.4')}px;
  border: 1px solid ${themeGet('colors.lightGrey')};
`

Panel.defaultProps = {
  width: 400
}

export const Form = styled.form`
  position: sticky;
  height: ${themeGet('buttonHeight.1')}px;
  ${zIndex};
`

Form.defaultProps = {
  zIndex: 101
}

export const Body = styled(Row)`
  position: absolute;
  z-index: 1;
  ${FilterButton} {
    margin-right: ${themeGet('space.2')}px;
  }
`

export const Background = styled.a`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
`
