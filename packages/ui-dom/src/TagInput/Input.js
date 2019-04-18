import React from 'react'
import Input from '../Input'
import {tagVerticalMargin} from './Button'

export default ({style, ...props}) => (
  <Input
    hideErrorView
    hideLabelView
    style={Object.assign(
      {
        marginTop: `-${tagVerticalMargin}px`,
        border: 'none',
        outline: 'none'
      },
      style || {}
    )}
    {...props}
  />
)
