import React from 'react'
import styled from 'styled-components'
import * as text from '@emcasa/ui/lib/components/Text'

const Text = styled((props) => {
  // Remove props that shouldn't be passed to the dom element
  let domProps = Object.assign({}, props)
  delete domProps.inline
  delete domProps.textAlign
  return (props.inline ? <span {...domProps} /> : <p {...domProps} />)
})`
  -webkit-font-smoothing: antialiased;
  ${text.container};
`

Text.defaultProps = {
  ...text.container.defaultProps
}

export default Text
