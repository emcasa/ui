import React from 'react'
import styled from 'styled-components'
import RadioButton, * as styles from '@emcasa/ui/lib/components/RadioButton'

import {safe} from '../utils'

const Container = styled(safe.TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  ${styles.container};
`

Container.defaultProps = styles.container.defaultProps

const Button = styled(safe.View)`
  ${styles.button};
`

Button.defaultProps = styles.button.defaultProps

const CheckMark = styled(safe.View)`
  ${styles.checkMark};
`

CheckMark.defaultProps = styles.checkMark.defaultProps

const Label = styled(safe.Text)`
  ${styles.label};
`

Label.defaultProps = styles.label.defaultProps

export default RadioButton(({onChange, disabled, checked, label, ...props}) => (
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
))
