import get from 'lodash/fp/get'
import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import {themeGet, color, borderColor, zIndex} from 'styled-system'
import Button from '../Button'
import Row from '../Row'
import Col from '../Col'
import Icon from '../Icon'
import Text from '../Text'
import {breakpoint} from '@emcasa/ui/lib/styles'

export const BUTTON_HEIGHT = themeGet('buttonHeight.1')
export const ROW_PADDING = themeGet('space.2')
export const ROW_HEIGHT = (props) =>
  BUTTON_HEIGHT(props) + ROW_PADDING(props) * 2
export const TOP_SPACING = ({offset, ...props}) =>
  (offset || ROW_HEIGHT(props)) + props.theme.space[4] * 2
export const MIN_PANEL_HEIGHT_MOBILE = 200

export const Container = styled.div`
  position: relative;
  height: ${ROW_HEIGHT};
  ${zIndex};
`

Container.defaultProps = {
  zIndex: 101
}

export const FilterButton = styled(Button)`
  ${borderColor};
  ${color};
  ${({hasValue, selected, disabledStyle, theme}) => {
    let color
    let borderColor
    const opacity = disabledStyle ? '70' : ''
    if (hasValue || selected) color = borderColor = theme.colors.pink + opacity
    else if (disabledStyle) color = theme.colors.grey
    else color = theme.colors.dark
    return {color, borderColor}
  }};
`

FilterButton.defaultProps = {
  type: 'button',
  fontSize: 'small'
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
    flex: 1 0 ${MIN_PANEL_HEIGHT_MOBILE}px;
    box-shadow: none;
    padding-top: 0;
  }
  @media screen and ${breakpoint.up('desktop')} {
    position: absolute;
    border-radius: 4px;
    border: 1px solid ${themeGet('colors.lightGrey')};
  }
`

Panel.defaultProps = {
  width: 400
}

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
    filterOpen: {
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
    filterClosed: {
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
  position: sticky;
  display: flex;
  flex-direction: row;
  ${zIndex};
`

Form.defaultProps = {
  zIndex: 101
}

export const BodyExpander = styled(
  posed.div({
    rowOpen: {
      flip: true,
      height: get('height')
    },
    rowClosed: {
      flip: true,
      height: ROW_HEIGHT
    }
  })
).attrs({
  theme: ({theme}) => theme
})`
  flex: 1;
  padding: ${ROW_PADDING}px 0;
  height: ${ROW_HEIGHT}px;
  min-height: ${ROW_HEIGHT}px;
  overflow: hidden;
`

export const Body = styled(Row)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${FilterButton} {
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
      <FilterButton onClick={onClick}>
        <Icon name={isRowExpanded ? 'angle-up' : 'angle-down'} color="grey" />
      </FilterButton>
    </Col>
  )
})`
  padding: ${ROW_PADDING}px 0;
  & > button {
    padding: 0 ${themeGet('space.2')}px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const BackgroundComponent = React.forwardRef(
  ({contentRef, onDismiss, ...props}, ref) => (
    <div ref={ref} {...props}>
      <a className="closeButton" onClick={onDismiss}>
        <Icon name="times" size={22} />
      </a>
      <div ref={contentRef} className="content" />
      <a className="clickArea" onClick={onDismiss} />
    </div>
  )
)

export const Background = styled(
  posed(BackgroundComponent)({
    bgOpen: {
      opacity: 1
    },
    bgClosed: {
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
