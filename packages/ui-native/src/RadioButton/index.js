import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import * as styles from '@emcasa/ui/lib/components/RadioButton'
import Group from '@emcasa/ui/lib/components/Group'

import {omitLayoutProps} from '../utils/omitProps'

const Container = styled(omitLayoutProps(TouchableOpacity))`
  flex-direction: row;
  align-items: center;
  ${styles.container};
`

Container.defaultProps = styles.container.defaultProps

const Button = styled(View)`
  ${styles.button};
`

Button.defaultProps = styles.button.defaultProps

const CheckMark = styled(View)`
  ${styles.checkMark};
`

CheckMark.defaultProps = styles.checkMark.defaultProps

const Label = styled(Text)`
  ${styles.label};
`

Label.defaultProps = styles.label.defaultProps

function RadioButtonComponent({onChange, disabled, checked, label, ...props}) {
  return (
    <Container
      onPress={onChange}
      disabled={disabled}
      checked={checked}
      {...props}
    >
      <Button checked={checked} disabled={disabled} label={label}>
        {checked && <CheckMark />}
      </Button>
      {label && (
        <Label disabled={disabled} {...props}>
          {label}
        </Label>
      )}
    </Container>
  )
}

RadioButtonComponent.Group = Group(({onSelect, selected, disabled}) => ({
  disabled,
  onChange: onSelect,
  checked: selected
}))(View)

export default RadioButtonComponent
