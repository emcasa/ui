import styled from 'styled-components/native'
import * as col from '@emcasa/ui/lib/components/Col'

const Col = styled.View`
  ${col.container};
`

Col.propTypes = col.container.propTypes

Col.displayName = 'Col'

export default Col
