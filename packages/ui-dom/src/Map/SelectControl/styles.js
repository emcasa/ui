import curry from 'lodash/curry'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {buttonHeight} from '@emcasa/ui/lib/styles'
import BaseButton from '../../Button'

const getHeight = curry((prop, props) =>
  parseInt((buttonHeight({height: props[prop]}) || {}).height || 0)
)

export default styled.div`
  position: relative;
  ${buttonHeight};
  overflow: visible;
`

export const List = styled.div`
  z-index: -1;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding-top: ${getHeight('offset')}px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  border-radius: 2px;
  transition: max-height 150ms ease-in-out;
  max-height: ${(props) => (props.expanded ? props.height : 0)}px;
`

export const Option = styled(BaseButton)`
  width: 100%;
  border-radius: 0;
  border: none;
  padding-left: ${themeGet('space.2')}px;
  padding-right: ${themeGet('space.2')}px;
`

export const GroupContainer = styled.div``

export const Button = styled(BaseButton)`
  position: relative;
  z-index: 1;
  border-radius: ${(props) => (props.expanded ? '2px 2px 0 0' : '2px')};
  background-color: ${(props) =>
    props.expanded ? props.theme.colors.darkSnow : 'white'};
  border: none;
`
