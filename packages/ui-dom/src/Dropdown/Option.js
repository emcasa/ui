import React from 'react'
import styled, {css} from 'styled-components'
import {themeGet} from '@styled-system/theme-get'
import {option} from '@emcasa/ui/lib/components/Dropdown'

const Button = styled.li`
  display: flex;
  align-items: center;
  flex: 0 0 ${themeGet('buttonHeight.0')}px;
  padding: 0 ${themeGet('space.4')}px;
  box-sizing: border-box;
  overflow: hidden;
  font-size: ${themeGet('buttonFontSize.0')}px;
  color: ${themeGet('colors.grey900')};
  line-height: 20px;
  text-align: left;
  background-color: ${themeGet('colors.white')};
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
  flex: 0 0 22px;
  height: 22px;
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
    ${({selected}) =>
      selected
        ? css`
            transform: scale(1);
          `
        : css`
            transform: scale(0);
          `}
  }
`

const DropdownOption = ({children, selected, onSelect}) => (
  <Button
    role="option"
    aria-selected={selected}
    tabIndex={0}
    onMouseDown={onSelect}
  >
    <Radio selected={selected} />
    {children}
  </Button>
)

DropdownOption.displayName = 'DropdownOption'

DropdownOption.propTypes = option.propTypes

DropdownOption.defaultProps = option.defaultProps

export default DropdownOption
