import React from 'react'
import styled from 'styled-components'
import * as styles from '@emcasa/ui/lib/components/RadioButton'
import Group from '@emcasa/ui/lib/components/Group'

import View from '../View'

const Container = styled.div`
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  ${styles.container};
`

Container.defaultProps = styles.container.defaultProps

const Button = styled.div`
  box-sizing: border-box;
  ${styles.button};
`

Button.defaultProps = styles.button.defaultProps

const CheckMark = styled.div`
  box-sizing: border-box;
  ${styles.checkMark};
`

CheckMark.defaultProps = styles.checkMark.defaultProps

const Label = styled.label`
  -webkit-font-smoothing: antialiased;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  ${styles.label};
`

Label.defaultProps = styles.label.defaultProps

function RadioButtonComponent({onChange, disabled, checked, label, ...props}) {
  return (
    <Container
      onClick={onChange}
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

RadioButtonComponent.Group.displayName = 'RadioGroup'

export default RadioButtonComponent
