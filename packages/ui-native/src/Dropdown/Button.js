import React, {Fragment} from 'react'
import {TouchableHighlight} from 'react-native'
import styled from 'styled-components'
import {button} from '@emcasa/ui/lib/components/Dropdown'

import View from '../View'
import Icon from '../Icon'
import Text from '../Text'

const ButtonText = styled(Text)`
  flex: 1;
  ${button.text};
`

const DropdownButton = styled(
  ({children, style, onFocusChange, icon, type, iconProps = {}, ...props}) => {
    delete props.height, props.width
    return (
      <TouchableHighlight style={style} onPress={onFocusChange}>
        <Fragment>
          <Icon
            name={icon ? icon : props.focused ? 'caret-up' : 'caret-down'}
            type={type}
            color="dark"
            size={18}
            mr="10px"
            {...iconProps}
          />
          {React.isValidElement(children) ? (
            children
          ) : (
            <ButtonText {...props}>{children}</ButtonText>
          )}
        </Fragment>
      </TouchableHighlight>
    )
  }
)`
  ${button};
`

DropdownButton.displayName = 'DropdownButton'

DropdownButton.propTypes = button.propTypes

export default DropdownButton
