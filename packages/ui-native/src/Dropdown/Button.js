import React from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components'
import {button} from '@emcasa/ui/lib/components/Dropdown'

import Row from '../Row'
import Icon from '../Icon'
import Text from '../Text'

const ButtonText = styled(Text)`
  flex: 1;
  text-align-vertical: center;
  ${button.text};
`

const DropdownButton = styled(
  ({children, style, onFocusChange, icon, type, iconProps = {}, ...props}) => {
    delete props.height, props.width
    return (
      <TouchableWithoutFeedback onPress={onFocusChange}>
        <Row style={style}>
          <Icon
            name={icon ? icon : props.focused ? 'caret-up' : 'caret-down'}
            type={type}
            color="dark"
            size={18}
            mr="10px"
            {...iconProps}
          />
          <Row alignItems="center">
            {React.isValidElement(children) ? (
              children
            ) : (
              <ButtonText {...props}>{children}</ButtonText>
            )}
          </Row>
        </Row>
      </TouchableWithoutFeedback>
    )
  }
)`
  ${button};
`

DropdownButton.displayName = 'DropdownButton'

DropdownButton.propTypes = button.propTypes

export default DropdownButton
