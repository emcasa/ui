import styled from 'styled-components'
import * as view from '@emcasa/ui/lib/components/View'

const View = styled.div`
  ${view.container};
`

View.propTypes = view.container.propTypes

View.displayName = 'View'

export default View
