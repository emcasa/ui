import styled from 'styled-components'
import * as col from '@emcasa/ui/lib/components/Col'

const Col = styled.div`
  ${col.container};
`

Col.propTypes = col.container.propTypes

export default Col
