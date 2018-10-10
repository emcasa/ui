import styled from 'styled-components/native'
import * as row from '@emcasa/ui/lib/components/Row'

const Row = styled.View`
  ${row.container};
`

Row.propTypes = row.container.propTypes

Row.defaultProps = {
  flexDirection: 'row'
}

Row.displayName = 'Row'

export default Row
