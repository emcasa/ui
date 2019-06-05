import React from 'react'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import PulseLoader from 'react-spinners/PulseLoader'
import Row from '@emcasa/ui-dom/components/Row'

export default styled(function Spinner(props) {
  return (
    <Row alignItems="center" justifyContent="center" p={3}>
      <PulseLoader {...props} />
    </Row>
  )
}).attrs({
  size: 6,
  color: themeGet('colors.pink')
})``
