import React from 'react'
import styled from 'styled-components'

export default function styledProp(propName) {
  return (...args) => (Target) => {
    const Component = ({style, ...props}) => (
      <Target {...{[propName]: style, ...props}} />
    )
    Component.displayName = `StyledProp(${propName})`
    return styled(Component)(...args)
  }
}
