import React from 'react'
import styled from 'styled-components'
import RadioButton, * as styles from '@emcasa/ui/lib/components/RadioButton'

const Container = styled.div`
  ${styles.container};
`

Container.defaultProps = styles.container.defaultProps

const Button = styled.div`
  ${styles.button};
`

Button.defaultProps = styles.button.defaultProps

const CheckMark = styled.div`
  ${styles.checkMark};
`

CheckMark.defaultProps = styles.checkMark.defaultProps

const Label = styled.label`
  ${styles.label};
`

Label.defaultProps = styles.label.defaultProps

/** @component */
export default RadioButton(({onChange, disabled, checked, label, ...props}) => (
  <Container
    onClick={onChange}
    disabled={disabled}
    checked={checked}
    {...props}
  >
    <Button checked={checked} disabled={disabled} label={label}>
      {checked && <CheckMark />}
    </Button>
    {label && <Label disabled={disabled}>{label}</Label>}
  </Container>
))
