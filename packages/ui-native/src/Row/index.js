import {View} from 'react-native'
import styled from 'styled-components/native'
import * as row from '@emcasa/ui/lib/components/Row'

import {omitLayoutProps} from '../utils/omitProps'

const Row = styled(omitLayoutProps(View))`
  ${row.container};
`

Row.propTypes = row.container.propTypes

Row.defaultProps = {
  flexDirection: 'row'
}

Row.displayName = 'Row'

export default Row
