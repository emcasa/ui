import React, {PureComponent} from 'react'
import {
  Modal,
  FlatList as RCTFlatList,
  TouchableWithoutFeedback
} from 'react-native'
import styled from 'styled-components'
import compose from 'recompose/compose'
import {container} from '@emcasa/ui/lib/components/Dropdown'

import styledProp from '../utils/styledProp'
import View from '../View'

const Container = compose(styledProp('contentContainerStyle')`
  ${container.contentContainer};
`)(
  styled(View.withComponent(RCTFlatList))`
    position: absolute;
    ${({layout}) => layout};
    ${container};
    padding-top: 10px;
  `
)

export default class DropdownContainer extends PureComponent {
  static propTypes = container.propTypes

  static defaultProps = {
    bounces: false
  }

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
        <TouchableWithoutFeedback onPress={onDropdownBlur}>
          <View width="100%" height="100%">
            {layout && (
              <Container
                layout={layout}
                {...props}
                data={children}
                renderItem={({item}) => item}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}
