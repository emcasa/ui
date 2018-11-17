import React, {PureComponent} from 'react'
import {Modal, FlatList} from 'react-native'
import styled from 'styled-components'
import {container} from '@emcasa/ui/lib/components/Dropdown'

import View from '../View'

const Container = styled(View)`
  position: absolute;
  ${({layout}) => layout};
  ${container};
  padding-top: 10px;
`

export default class DropdownContainer extends PureComponent {
  static propTypes = container.propTypes

  state = {
    layout: undefined
  }

  updateLayout() {
    const {target} = this.props
    if (!target) return
    target.measureInWindow((x, y, width, height) =>
      this.setState({
        layout: {top: y + height, left: x, width}
      })
    )
  }

  componentDidUpdate(prevProps) {
    const {focused} = this.props
    if (prevProps.focused !== focused && focused) this.updateLayout()
  }

  render() {
    const {children, onDropdownBlur, ...props} = this.props
    const {layout} = this.state
    return (
      <Modal
        transparent
        presentationStyle="overFullScreen"
        visible={props.focused}
        onDismiss={onDropdownBlur}
        onRequestClose={onDropdownBlur}
      >
        <Container layout={layout} {...props}>
          {children}
        </Container>
      </Modal>
    )
  }
}
