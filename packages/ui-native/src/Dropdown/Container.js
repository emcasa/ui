import React, {PureComponent} from 'react'
import {
  Modal,
  FlatList as RCTFlatList,
  TouchableWithoutFeedback
} from 'react-native'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import compose from 'recompose/compose'
import {container} from '@emcasa/ui/lib/components/Dropdown'

import styledProp from '../utils/styledProp'
import View from '../View'

const Container = compose(styledProp('contentContainerStyle')`
  ${container.contentContainer};
`)(
  styled(View.withComponent(RCTFlatList))`
    position: absolute;
    ${container};
  `
)

export default styled(
  class DropdownContainer extends PureComponent {
    render() {
      const {children, style, onDropdownBlur, ...props} = this.props
      return (
        <Modal
          transparent
          presentationStyle="overFullScreen"
          visible={props.focused}
          onDismiss={onDropdownBlur}
          onRequestClose={onDropdownBlur}
        >
          <TouchableWithoutFeedback onPress={onDropdownBlur}>
            <View style={style}>
              {props.layout && (
                <Container
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
)`
  width: 100%;
  height: 100%;
  margin-top: ${themeGet('Dropdown.offset.top', 0)};
`
