import React, {Fragment} from 'react'
import {TouchableHighlight} from 'react-native'
import styled from 'styled-components'
import {option} from '@emcasa/ui/lib/components/Dropdown'

import Text from '../Text'

const OptionText = styled(Text)`
  ${option.text};
`

const DropdownOption = styled(({children, style, onSelect, ...props}) => {
  return (
    <TouchableHighlight style={style} onPress={onSelect}>
      {React.isValidElement(children) ? (
        <Fragment>{children}</Fragment>
      ) : (
        <OptionText {...props}>{children}</OptionText>
      )}
    </TouchableHighlight>
  )
})`
  ${option};
`

DropdownOption.displayName = 'DropdownOption'

DropdownOption.propTypes = option.propTypes

export default DropdownOption
