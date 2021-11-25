import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import Row from '@emcasa/ui-dom/components/Row'
import colors from '@emcasa/ui/src/theme/colors'

const Spinner = () => {
  return (
    <Row alignItems="center" justifyContent="center" p={3}>
      <PulseLoader size={6} color={colors.grey300} />
    </Row>
  )
}

export default Spinner
