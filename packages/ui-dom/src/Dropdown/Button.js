import React from 'react'
import styled from 'styled-components'
import {button} from '@emcasa/ui/lib/components/Dropdown'

import Icon from '../Icon'
import Text from '../Text'

const ButtonText = styled(({id, className, style, children}) => (
  <Text inline id={id} className={className} style={style}>
    {children}
  </Text>
))`
  ${button.textContainer};
  ${button.text};
`

const ButtonBackground = styled.div`
  ${button.pseudoBackground};
  box-sizing: border-box;
`

const DropdownButton = styled(
  ({
    children,
    id,
    className,
    style,
    onFocusChange,
    focused,
    icon,
    type,
    iconProps = {},
    ...props
  }) => {
    return (
      <div>
        <div
          tabIndex={0}
          id={id}
          className={className}
          style={style}
          onMouseDown={() => setTimeout(onFocusChange, 0)}
        >
          <Icon
            name={icon ? icon : focused ? 'caret-up' : 'caret-down'}
            type={type}
            color="dark"
            size={18}
            {...iconProps}
          />
          <ButtonText {...props}>{children}</ButtonText>
        </div>
        {focused && <ButtonBackground />}
      </div>
    )
  }
)`
  z-index: 0;
  outline: none;
  cursor: pointer;
  ${button};
`

DropdownButton.displayName = 'DropdownButton'

DropdownButton.propTypes = button.propTypes

export default DropdownButton
