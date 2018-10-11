import styled from 'styled-components/native'
import * as view from '@emcasa/ui/lib/components/View'

import {safe} from '../utils'

const View = styled(safe.View)`
  ${view.container};
`

View.propTypes = view.container.propTypes

View.displayName = 'View'

export default View
