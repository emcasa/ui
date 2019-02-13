import React from 'react'
import styled from 'styled-components'
import {themeGet, color, borderColor, zIndex} from 'styled-system'
import Button from '../Button'
import View from '../View'
import Row from '../Row'
import Icon from '../Icon'
import {breakpoint} from '@emcasa/ui/lib/styles'

export const FilterButton = styled(Button).attrs({type: 'button'})`
  ${borderColor};
  ${color};
`

export const Panel = styled(View).attrs({elevation: 2})`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  border-radius: 4px;
  margin-top: ${themeGet('space.2')}px;
  padding: ${themeGet('space.3')}px ${themeGet('space.4')}px;
  border: 1px solid ${themeGet('colors.lightGrey')};
  .panelBody {
    flex: 1;
    flex-direction: column;
    justify-content: center;
  }
  .panelFooter {
    margin-top: ${themeGet('space.4')}px;
    justify-content: space-between;
  }
  @media screen and ${breakpoint.down('tablet')} {
    position: fixed;
    left: ${themeGet('space.4')}px;
    right: ${themeGet('space.4')}px;
    width: auto;
    box-shadow: none;
    border: none;
    ${({contentRect, theme}) =>
      contentRect && {
        top: contentRect.bottom,
        height: `${window.innerHeight -
          contentRect.bounds.bottom -
          theme.space[2] -
          2}px`
      }};
  }
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
  z-index: 1;
  position: absolute;
  ${FilterButton} {
    margin-right: ${themeGet('space.2')}px;
  }
`

export const Background = styled(({onDismiss, ...props}) => (
  <div {...props}>
    <a className="closeButton" onClick={onDismiss}>
      <Icon name="times" size={22} />
    </a>
    <a className="clickArea" onClick={onDismiss} />
  </div>
))`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);

  a.clickArea {
    display: block;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  a.closeButton {
    display: none;
    position: absolute;
    top: ${themeGet('space.4')}px;
    right: ${themeGet('space.4')}px;
    padding: ${themeGet('space.4')}px;
  }

  @media screen and ${breakpoint.down('tablet')} {
    background: rgba(255, 255, 255, 1);

    a.clickArea {
      display: none;
    }

    a.closeButton {
      display: block;
    }
  }
`
