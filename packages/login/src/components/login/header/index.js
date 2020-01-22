import React from 'react'
import Logo from '@/components/shared/Logo'
import Icon from '@emcasa/ui-dom/components/Icon'
import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'

export default function Header({onClose}) {
  return (
    <Row justifyContent="space-between" mb="32px">
      <Logo />
      <Button link onClick={onClose} p={0} height="20px">
        <Icon name="times" height="20px" />
      </Button>
    </Row>
  )
}
