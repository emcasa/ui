import React from 'react'
import styled, {css} from 'styled-components'
import {themeGet} from '@styled-system/theme-get'
import {option} from '@emcasa/ui/lib/components/Dropdown'
import Icon from '../Icon'

const RADIO_WIDTH = 22

export const optionStyles = css`
  display: flex;
  align-items: center;
  flex: 0 0 ${themeGet('buttonHeight.0')}px;
  padding: 0 ${themeGet('space.3')}px;
  box-sizing: border-box;
  overflow: hidden;
  font-family: ${themeGet('fontFamily')};
  font-size: ${themeGet('buttonFontSize.0')}px;
  line-height: 20px;
  text-align: left;
  background-color: ${themeGet('colors.white')};
`

const Button = styled.li`
  ${optionStyles}
  color: ${themeGet('colors.grey900')};
  touch-action: manipulation;
  user-select: none;
  outline: none;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${themeGet('colors.grey100')};
  }
`

const Radio = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 ${RADIO_WIDTH}px;
  height: ${RADIO_WIDTH}px;
  margin-right: ${themeGet('space.3')}px;
  border: 1px solid ${themeGet('colors.grey900')};
  border-radius: 100%;

  &::after {
    content: '';
    width: 16px;
    height: 16px;
    background-color: ${themeGet('colors.grey900')};
    transition: transform 0.45s cubic-bezier(0.4, 0.2, 0, 1);
    border-radius: 100%;
    transform: scale(${({selected}) => (selected ? '1' : '0')});
  }
`

export const LeadingIcon = styled(Icon).attrs({
  width: RADIO_WIDTH,
  height: '100%'
})`
  flex: 0 0 ${RADIO_WIDTH}px;
  margin-right: ${themeGet('space.3')}px;

  svg {
    width: 100%;
  }
`

const DropdownOption = ({children, selected, onSelect, iconProps}) => (
  <Button
    role="option"
    aria-selected={selected}
    tabIndex={0}
    onMouseDown={onSelect}
  >
    {iconProps ? <LeadingIcon {...iconProps} /> : <Radio selected={selected} />}
    {children}
  </Button>
)

DropdownOption.displayName = 'DropdownOption'

DropdownOption.propTypes = option.propTypes

DropdownOption.defaultProps = option.defaultProps

export default DropdownOption
