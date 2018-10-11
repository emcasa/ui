import styled from 'styled-components/native'
import * as view from '@emcasa/ui/lib/components/View'

const View = styled.View`
  ${view.container};
`

View.propTypes = view.container.propTypes

View.displayName = 'View'

export default View
