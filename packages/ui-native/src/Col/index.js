import styled from 'styled-components/native'
import * as col from '@emcasa/ui/lib/components/Col'

import {safe} from '../utils'

const Col = styled(safe.View)`
  ${col.container};
`

Col.propTypes = col.container.propTypes

Col.displayName = 'Col'

export default Col
