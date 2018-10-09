import React from 'react'
import styled from 'styled-components'
import * as text from '@emcasa/ui/lib/components/Text'

const Text = styled((props) => {
  // Remove the 'inline' prop that would be passed to the dom element
  let domProps = Object.assign({}, props)
  delete domProps.inline
  return (props.inline ? <span {...domProps} /> : <p {...domProps} />)
})`
  ${text.container};
`

Text.defaultProps = {
  ...text.container.defaultProps
}

export default Text
