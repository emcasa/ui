import React from 'react'
import Button from './styles'
import Control from '../Control'

export default function ButtonControl({
  style,
  className,
  position,
  m,
  mt,
  mb,
  mr,
  ml,
  zIndex,
  index,
  onControlReady,
  ...props
}) {
  return (
    <Control
      {...{
        position,
        style,
        className,
        m,
        mt,
        mb,
        mr,
        ml,
        zIndex,
        index,
        onControlReady
      }}
    >
      <Button {...props} />
    </Control>
  )
}
