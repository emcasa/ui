import React, {Component} from 'react'
import Row from '@emcasa/ui-dom/components/Row'
import Loader from '@/components/shared/Loader'

class Loading extends Component {
  render() {
    return (
      <Row justifyContent="center" alignItems="center" height="100%">
        <Loader />
      </Row>
    )
  }
}

export default Loading
