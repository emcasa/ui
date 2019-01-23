import React, {PureComponent} from 'react'
import {
  View as RCTView,
  TouchableWithoutFeedback,
  Platform,
  StatusBar
} from 'react-native'
import styled from 'styled-components'
import {button} from '@emcasa/ui/lib/components/Dropdown'

import isValidTextElement from '../utils/isValidTextElement'
import View from '../View'
import Row from '../Row'
import Icon from '../Icon'
import Text from '../Text'

const ButtonText = styled(Text)`
  flex: 1;
  text-align-vertical: center;
  ${button.text};
`

const ButtonBackground = styled(View)`
  ${button.pseudoBackground};
`

export default styled(
  class DropdownButton extends PureComponent {
    static propTypes = button.propTypes

    button = React.createRef()

    componentDidUpdate(prevProps) {
      const {focused} = this.props
      if (prevProps.focused !== focused) {
        if (focused) this.updateLayout()
        else this.clearLayout()
      }
    }

    _calculateLayout = Platform.select({
      android: (x, y, width, height) => ({
        top: StatusBar.currentHeight + y + height,
        left: x,
        width
      }),
      ios: (x, y, width, height) => ({
        top: y + height,
        left: x,
        width
      })
    })

    updateLayout = () => {
      if (!this.button.current) return
      this.button.current.measureInWindow((...args) => {
        this.props.onLayout(this._calculateLayout(...args))
      })
    }

    clearLayout = () => this.props.onLayout(undefined)

    render() {
      const {
        children,
        style,
        onFocusChange,
        icon,
        type,
        iconProps = {},
        ...props
      } = this.props
      delete props.height
      delete props.width
      delete props.onLayout
      return (
        <TouchableWithoutFeedback onPress={onFocusChange}>
          <RCTView style={{position: 'relative'}}>
            <Row
              collapsable={false}
              innerRef={this.button}
              style={style}
              onLayout={props.focused ? this.updateLayout : undefined}
            >
              <Icon
                name={icon ? icon : props.focused ? 'caret-up' : 'caret-down'}
                type={type}
                color="dark"
                size={18}
                mr="5px"
                {...iconProps}
              />
              <Row alignItems="center">
                {isValidTextElement(children) ? (
                  <ButtonText {...props}>{children}</ButtonText>
                ) : (
                  children
                )}
              </Row>
            </Row>
            {props.focused && <ButtonBackground />}
          </RCTView>
        </TouchableWithoutFeedback>
      )
    }
  }
)`
  ${button};
`
