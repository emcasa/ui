import React from 'react'
import styled, {css} from 'styled-components'
import {themeGet} from '@styled-system/theme-get'
import Icon from '../Icon'

const ICON_WIDTH = 40
const BUTTON_PADDING_X = 36

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: ${({height}) =>
    height === 'short'
      ? themeGet('buttonHeight.2')
      : height === 'tall'
        ? themeGet('buttonHeight.0')
        : themeGet('buttonHeight.1')}px;
  font-size: ${({height}) =>
    height === 'short'
      ? themeGet('buttonFontSize.0')
      : height === 'tall'
        ? themeGet('buttonFontSize.2')
        : themeGet('buttonFontSize.1')}px;
  border: 1px solid
    ${({error}) =>
    !!error ? themeGet('colors.red500') : themeGet('colors.grey300')};
  border-radius: 8px;
  background-color: ${themeGet('colors.white')};
  user-select: none;
  touch-action: manipulation;
`

const Button = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${themeGet('colors.white')};
  border: none;
  padding: 0
    ${({hideTrailingIcon}) =>
      hideTrailingIcon ? themeGet('space.3') : BUTTON_PADDING_X}px
    0
    ${({leadingIconProps}) => leadingIconProps ? BUTTON_PADDING_X : themeGet('space.3')}px;
  box-sizing: border-box;
  font-size: inherit;
  text-align: left;
  color: ${({showPlaceholder}) =>
    showPlaceholder ? themeGet('colors.grey500') : themeGet('colors.grey900')};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:focus {
    outline: none;
  }
`

const iconStyle = css`
  position: absolute;
  top: 0;
  pointer-events: none;
  justify-content: center;
`

const iconAttrs = {
  width: ICON_WIDTH,
  height: '100%'
}

const LeadingIcon = styled(Icon).attrs(iconAttrs)`
  ${iconStyle}
  left: 0;
`

const TrailingIcon = styled(Icon).attrs(iconAttrs)`
  ${iconStyle}
  right: 0;
  transition: transform 0.5s cubic-bezier(0.4, 0.2, 0, 1);
  transform: ${({focused}) => focused && 'rotateX(180deg)'};
`

const DropdownButton = ({
  children,
  onFocusChange,
  onClick,
  focused,
  height,
  dropdownId,
  placeholder,
  inputProps,
  error,
  leadingIconProps,
  hideTrailingIcon,
  ...props
}) => {
  const searchInputProps = inputProps || (props.label && props.label.props)

  let buttonProps = {
    id: `${dropdownId}btn`,
    height: height,
    showPlaceholder: placeholder && placeholder === children,
    leadingIconProps,
    hideTrailingIcon,
    role: searchInputProps ? 'combobox' : null,
    'aria-controls': `${dropdownId}list`,
    'aria-owns': `${dropdownId}list`,
    'aria-haspopup': 'listbox',
    'aria-expanded': focused ? 'true' : 'false',
    title: searchInputProps ? placeholder || 'Ver lista' : null,
    onMouseDown: () => setTimeout(onFocusChange, 0),
    onClick: onClick
  }

  if (searchInputProps) {
    buttonProps = {
      ...buttonProps,
      ...searchInputProps
    }
  }

  return (
    <Wrapper height={height} error={error}>
      {leadingIconProps && (
        <LeadingIcon
          size={height === 'short' ? 12 : 16}
          {...leadingIconProps}
        />
      )}
      {searchInputProps ? (
        <Button as="input" placeholder={placeholder} {...buttonProps} />
      ) : (
        <Button type="button" {...buttonProps}>
          {children}
        </Button>
      )}
      {!hideTrailingIcon && (
        <TrailingIcon
          focused={focused}
          name="chevron-down"
          color="dark"
          size={height === 'short' ? 12 : 16}
        />
      )}
    </Wrapper>
  )
}

DropdownButton.displayName = 'DropdownButton'

export default DropdownButton
