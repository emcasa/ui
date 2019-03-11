import get from 'lodash/fp/get'
import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import {themeGet, zIndex, width, space} from 'styled-system'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Row from '../Row'
import Col from '../Col'
import Icon from '../Icon'
import Text from '../Text'
import Button from '../Button'
import FilterButton from './FilterButton'
import {
  ROW_PADDING,
  ROW_HEIGHT,
  TOP_SPACING,
  MOBILE_PANEL_MIN_HEIGHT,
  DESKTOP_PANEL_WIDTH
} from './constants'

const swiftInOut = [0.55, -0.15, 0.15, 1.45]

const transition = {
  duration: 250,
  ease: swiftInOut
}

transition.css = `${transition.duration}ms cubic-bezier(${transition.ease.join(',')})`

export const Container = styled.div`
  position: relative;
  display: inline-flex;
  width: fit-content;
  min-height: ${ROW_HEIGHT}px;
  ${width};
  ${space};
  ${zIndex};
`

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
    border: 1px solid ${themeGet('colors.lightGrey')};
  }
`

export const PanelButton = styled(Button).attrs({
  type: 'button',
  link: ({isMobile}) => !isMobile
})`
  font-size: ${themeGet('fontSizes.1')}px;
  @media screen and ${breakpoint.down('tablet')} {
    height: ${themeGet('buttonHeight.0')}px;
  }
  @media screen and ${breakpoint.up('desktop')} {
    color: ${({active, theme: {colors}}) =>
      active ? colors.pink : colors.grey};
    padding: 0;
    height: auto;
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

const ROW_OFFSET_RIGHT = 60

const rightOffset = ({right}) => Math.max(0, ROW_OFFSET_RIGHT - (window.innerWidth - right))

export const Form = styled(
  posed.form({
    filterOpen: {
      transition,
      preTransition: (props) => props.dimensions.measure(),
      applyAtStart: {
        position: 'fixed',
        top: 0,
        left: mapDimensions(get('left')),
        width: mapDimensions(get('width')),
        y: mapDimensions(get('top'))
      },
      y: ({theme}) => theme.space[4],
      paddingRight: mapDimensions(rightOffset)
    },
    filterClosed: {
      transition,
      applyAtEnd: {
        position: '',
        top: '',
        left: '',
        width: '',
        y: 0
      },
      y: mapDimensions(get('top'), {initialize: false}),
      paddingRight: 0
    }
  })
).attrs({
  theme: ({theme}) => theme
})`
  flex: ${({fluid}) => (fluid ? '1' : '0 1 auto')};
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  ${zIndex};
`

const EXPANDED_ROW_HEIGHT = (props) => props.height + ROW_PADDING(props)

export const BodyExpander = styled(
  posed.div({
    rowOpen: {
      transition,
      flip: true,
      height: EXPANDED_ROW_HEIGHT
    },
    rowClosed: {
      transition,
      flip: true,
      height: ROW_HEIGHT
    }
  })
).attrs({
  theme: ({theme}) => theme
})`
  box-sizing: border-box;
  flex: 0 1 auto;
  padding: ${ROW_PADDING}px 0;
  height: ${ROW_HEIGHT}px;
  min-height: ${ROW_HEIGHT}px;
  overflow: hidden;
`

export const Body = styled(Row)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .filterButton {
    margin-right: ${themeGet('space.2')}px;
    margin-bottom: ${themeGet('space.2')}px;
  }
`

export const ExpandButton = styled(function ExpandButton({
  isRowExpanded,
  onClick,
  ...props
}) {
  return (
    <Col {...props}>
      <FilterButton onClick={onClick} style={{}}>
        <Icon name={isRowExpanded ? 'angle-up' : 'angle-down'} color="grey" />
      </FilterButton>
    </Col>
  )
})`
  button {
    padding: 0 ${themeGet('space.2')}px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: ${themeGet('colors.lightGrey')};
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
    bgOpen: {
      applyAtStart: {
        display: 'block',
        pointerEvents: 'all'
      },
      opacity: 1
    },
    bgClosed: {
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

  a.clickArea {
    display: block;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  a.closeButton {
    display: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: ${themeGet('space.4')}px;
  }

  .content {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
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
      width: 100%;
      max-height: 100%;
      height: calc(100vh - ${TOP_SPACING}px);
      margin-top: ${TOP_SPACING}px;
      padding: ${themeGet('space.4')}px;
      padding-top: 0;
      overflow-y: auto;
      transition: all ${transition.css};
    }
  }
`
