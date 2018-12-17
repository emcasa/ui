import pick from 'lodash.pick'
import omit from 'lodash.omit'
import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import * as button from '@emcasa/ui/lib/components/Button'
import Group from '@emcasa/ui/lib/components/Group'

import View from '../View'
import {omitLayoutProps, omitTextStyleProps} from '../utils/omitProps'

export const ButtonView = styled(omitLayoutProps(TouchableOpacity))`
  ${button.container};
`

export const ButtonText = styled(omitTextStyleProps(Text))`
  ${button.text};
`

const buttonTextProps = `color letterSpacing
fontFamily fontSize adjustsFontSizeToFit minimumFontScale
textBreakStrategy ellipsizeMode numberOfLines`.split(/\s+/)

const commonProps = 'link active disabled'.split(/\s+/)

export default function Button({children, ...props}) {
  return (
    <ButtonView {...omit(props, buttonTextProps)}>
      <ButtonText
        selectable={false}
        suppressHighlighting
        {...pick(props, buttonTextProps)}
        {...pick(props, commonProps)}
      >
        {children}
      </ButtonText>
    </ButtonView>
  )
}

Button.propTypes = {
  ...button.container.propTypes,
  ...button.text.propTypes
}

Button.defaultProps = {
  ...button.container.defaultProps,
  ...button.text.defaultProps,
  alignItems: 'center',
  justifyContent: 'center'
}

Button.Group = Group(({onSelect, selected, disabled}) => ({
  disabled,
  onPress: onSelect,
  active: selected
}))(View)
