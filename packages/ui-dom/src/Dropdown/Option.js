import React from 'react'
import styled from 'styled-components'
import {themeGet} from '@styled-system/theme-get'
import {option} from '@emcasa/ui/lib/components/Dropdown'
import Icon from '../Icon'

const Button = styled.li`
  display: flex;
  align-items: center;
  flex: 0 0 ${themeGet('buttonHeight.0')}px;
  padding: 0 ${themeGet('space.4')}px;
  box-sizing: border-box;
  overflow: hidden;
  font-family: ${themeGet('fontFamily')};
  font-size: ${themeGet('buttonFontSize.0')}px;
  line-height: 20px;
  text-align: left;
  color: ${themeGet('colors.grey900')};
  background-color: ${themeGet('colors.white')};
  outline: none;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  &:hover,
  &:focus {
    background-color: ${themeGet('colors.grey100')};
  }
`
const RADIO_WIDTH = 22

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

const LeadingIcon = styled(Icon).attrs({
  width: RADIO_WIDTH,
  height: '100%'
})`
  flex: 0 0 ${RADIO_WIDTH}px;
  margin-right: ${themeGet('space.3')}px;
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
