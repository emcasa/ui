import {View as RCTView} from 'react-native'
import styled from 'styled-components/native'
import * as view from '@emcasa/ui/lib/components/View'

import {omitLayoutProps} from '../utils/omitProps'

const View = styled(omitLayoutProps(RCTView))`
  ${view.container};
`

View.propTypes = view.container.propTypes

View.displayName = 'View'

export default View
