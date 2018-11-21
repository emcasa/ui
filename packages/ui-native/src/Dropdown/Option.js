import React, {Fragment} from 'react'
import {TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import {option} from '@emcasa/ui/lib/components/Dropdown'

import isValidTextElement from '../utils/isValidTextElement'
import Text from '../Text'

const OptionText = styled(Text)`
  ${option.text};
`

const DropdownOption = styled(({children, style, onSelect, ...props}) => {
  return (
    <TouchableOpacity style={style} onPress={onSelect} activeOpacity={0.85}>
      {isValidTextElement(children) ? (
        <OptionText {...props}>{children}</OptionText>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </TouchableOpacity>
  )
})`
  ${option};
`

DropdownOption.displayName = 'DropdownOption'

DropdownOption.propTypes = option.propTypes

export default DropdownOption
