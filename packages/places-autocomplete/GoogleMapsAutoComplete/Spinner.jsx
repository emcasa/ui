import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import Row from '@emcasa/ui-dom/components/Row'

const GREY300 = '#c0c2cc' // "import colors from '@emcasa/ui/src/theme/colors'" isn't working on /web and /garagem-blocks. Error: SyntaxError: Unexpected token 'export'("export default {").

const Spinner = () => {
  return (
    <Row alignItems="center" justifyContent="center" p={3}>
      <PulseLoader size={6} color={GREY300} />
    </Row>
  )
}

export default Spinner
