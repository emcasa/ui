import get from 'lodash/fp/get'
import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import {themeGet, zIndex} from 'styled-system'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Row from '../Row'
import Col from '../Col'
import Icon from '../Icon'
import Text from '../Text'
import FilterButton from './FilterButton'
import {
  ROW_PADDING,
  ROW_HEIGHT,
  TOP_SPACING,
  MOBILE_PANEL_MIN_HEIGHT,
  DESKTOP_PANEL_WIDTH
} from './constants'

export const Container = styled.div`
  position: relative;
  height: ${ROW_HEIGHT};
  ${zIndex};
`

Container.defaultProps = {
  zIndex: 101
}

export const Panel = styled(Col).attrs({elevation: 2})`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${themeGet('space.3')}px ${themeGet('space.4')}px;
  background-color: white;
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
    position: relative;
    width: auto;
    flex: 1 0 ${MOBILE_PANEL_MIN_HEIGHT}px;
    box-shadow: none;
    padding-top: 0;
  }
  @media screen and ${breakpoint.up('desktop')} {
    position: absolute;
    width: ${DESKTOP_PANEL_WIDTH}px;
    border-radius: 4px;
    margin-top: ${themeGet('space.2')}px;
    border: 1px solid ${themeGet('colors.lightGrey')};
  }
`

export const Title = styled(Text)`
  transition: all 300ms ease-in-out;
  display: flex;
  align-items: center;
  height: 0;
  margin: 0;
  overflow: hidden;
  display: block;
  @media screen and ${breakpoint.down('tablet')} {
    height: ${themeGet('buttonHeight.1')}px;
    line-height: ${themeGet('buttonHeight.1')}px;
  }
`

const mapDimensions = (fun, {initialize = true} = {}) => ({dimensions}) =>
  fun(initialize ? dimensions.measure() : dimensions.get())

export const Form = styled(
  posed.form({
    open: {
      preTransition: (props) => props.dimensions.measure(),
      applyAtStart: {
        position: 'fixed',
        top: 0,
        left: mapDimensions(get('left')),
        width: mapDimensions(get('width')),
        y: mapDimensions(get('top'))
      },
      y: ({theme}) => theme.space[4]
    },
    closed: {
      applyAtEnd: {
        position: '',
        top: '',
        left: '',
        width: '',
        y: 0
      },
      y: mapDimensions(get('top'), {initialize: false})
    }
  })
).attrs({
  theme: ({theme}) => theme
})`
  display: flex;
  flex-direction: row;
  position: sticky;
  padding: ${ROW_PADDING}px 0;
  height: ${ROW_HEIGHT}px;
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

const BackgroundComponent = React.forwardRef(
  ({contentRef, onDismiss, ...props}, ref) => (
    <div ref={ref} {...props}>
      <a className="closeButton" onClick={onDismiss}>
        <Icon name="times" size={22} color="dark" />
      </a>
      <div ref={contentRef} className="content" />
      <a className="clickArea" onClick={onDismiss} />
    </div>
  )
)

export const Background = styled(
  posed(BackgroundComponent)({
    open: {
      applyAtStart: {
        display: 'block',
        pointerEvents: 'all'
      },
      opacity: 1
    },
    closed: {
      applyAtEnd: {
        display: 'none',
        pointerEvents: 'none'
      },
      opacity: 0
    }
  })
)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  pointer-events: ${({pose}) => (pose === 'closed' ? 'none' : 'all')};

  a.clickArea {
    display: block;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  a.closeButton {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    padding: ${themeGet('space.4')}px;
  }

  .content {
    display: none;
    flex: 1;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    height: calc(100vh - ${TOP_SPACING}px);
    margin-top: ${TOP_SPACING}px;
    padding: ${themeGet('space.4')}px;
    padding-top: 0;
    overflow-y: auto;
  }

  @media screen and ${breakpoint.down('tablet')} {
    background: rgba(255, 255, 255, 1);

    a.clickArea {
      display: none;
    }

    a.closeButton {
      display: block;
    }

    .content {
      display: flex;
    }
  }
`
