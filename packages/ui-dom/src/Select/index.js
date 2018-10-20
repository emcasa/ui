import React from 'react'
import styled from 'styled-components'
import * as select from '@emcasa/ui/lib/components/Select'

const StyledSelect = styled.select`
  ${select.container};
`

const Select = (props) => <StyledSelect {...props}>{props.children}</StyledSelect>

Select.defaultProps = {
  ...select.container.defaultProps,
}

export default Select
