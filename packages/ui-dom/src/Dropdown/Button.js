import React from 'react'
import styled from 'styled-components'
import {themeGet} from '@styled-system/theme-get'
import Icon from '../Icon'

const ICON_WIDTH = '40px'

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
`

const Button = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${themeGet('colors.white')};
  border: none;
  padding: 0 ${ICON_WIDTH} 0 ${themeGet('space.3')}px;
  font-size: inherit;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({showPlaceholder}) =>
    showPlaceholder ? themeGet('colors.grey500') : themeGet('colors.grey900')};

  &:focus {
    outline: none;
  }
`

const ButtonIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  width: ${ICON_WIDTH};
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0.2, 0, 1);
  transform: rotateX(${({focused}) => (focused ? '180deg' : null)});
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
  ...props
}) => {
  const searchInputProps = inputProps || (props.label && props.label.props)

  let buttonProps = {
    id: `${dropdownId}btn`,
    height: height,
    showPlaceholder: placeholder && placeholder === children,
    role: 'combobox',
    'aria-controls': `${dropdownId}list`,
    'aria-haspopup': 'listbox',
    'aria-labelledby': `${dropdownId}btn`,
    'aria-expanded': focused ? 'true' : null,
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
      {searchInputProps ? (
        <Button as="input" placeholder={placeholder} {...buttonProps} />
      ) : (
        <Button type="button" {...buttonProps}>
          {children}
        </Button>
      )}
      <ButtonIcon
        focused={focused}
        name="chevron-down"
        color="dark"
        size={height === 'short' ? 12 : 16}
      />
    </Wrapper>
  )
}

DropdownButton.displayName = 'DropdownButton'

export default DropdownButton
