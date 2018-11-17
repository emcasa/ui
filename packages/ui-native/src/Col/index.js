import {View} from 'react-native'
import styled from 'styled-components/native'
import * as col from '@emcasa/ui/lib/components/Col'

import {omitLayoutProps} from '../utils/omitProps'

const Col = styled(omitLayoutProps(View))`
  ${col.container};
`

Col.propTypes = col.container.propTypes

Col.displayName = 'Col'

export default Col
