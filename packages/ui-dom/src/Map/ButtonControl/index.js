import React from 'react'
import Button from './styles'
import Control from '../Control'

export default function ButtonControl({position, m, mt, mb, mr, ml, ...props}) {
  return (
    <Control {...{position, m, mt, mb, mr, ml}}>
      <Button {...props} />
    </Control>
  )
}
