import pick from 'lodash.pick'
import React, {PureComponent} from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Group from '@emcasa/ui/lib/components/Group'
import * as tab from '@emcasa/ui/lib/components/Tab'

import {safe} from '../utils'
import Col from '../Col'

/**
 * TabBar
 */
const TabBar = styled(safe.View)`
  ${tab.tabBar};
`

TabBar.displayName = 'TabBar'

TabBar.propTypes = tab.tabBar.propTypes

/**
 * TabBarButton
 */
const TabBarButton = styled(safe.TouchableOpacity)`
  ${tab.tabBarButton};
`

TabBarButton.displayName = 'TabBarButton'

TabBarButton.propTypes = tab.tabBarButton.propTypes

/**
 * TabBarText
 */
const TabBarText = styled(safe.Text)`
  ${tab.tabBarText};
`

TabBarText.displayName = 'TabBarText'

TabBarText.propTypes = tab.tabBarText.propTypes

TabBarText.getProps = (props) => pick(props, Object.keys(TabBarText.propTypes))

/**
 * TabBar
 */
const Tab = styled(safe.View)`
  ${tab.container};
`

export default Tab

Tab.displayName = 'Tab'

Tab.propTypes = tab.container.propType

Tab.Group = Group(
  ({...props}) => {
    delete props.onSelect
    return props
  },
  (_, index) => index
)(
  class TabGroup extends PureComponent {
    static propTypes = {
      color: PropTypes.string,
      activeColor: PropTypes.string,
      /**
       * Render a tab bar button
       * @param {ReactElement} element React node corresponding to this tab index
       * @param {number} tabIndex Tab index being rendered
       * @returns {ReactNode}
       */
      renderTabBar: PropTypes.func.isRequired
    }

    static defaultProps = {
      initialValue: 0,
      color: 'grey',
      borderColor: 'pink',
      renderTabBar(node) {
        let {borderColor, ...props} = this.props
        return (
          <TabBarButton color={borderColor} selected={node.props.selected}>
            <TabBarText {...TabBarText.getProps(props)}>
              {node.props.label}
            </TabBarText>
          </TabBarButton>
        )
      }
    }

    renderTabBar = (node, index) => {
      const {renderTabBar, onSelect} = this.props
      return (
        <TouchableWithoutFeedback onPress={() => onSelect(index)}>
          {renderTabBar.call(this, node, index)}
        </TouchableWithoutFeedback>
      )
    }

    renderTab = (node, index) => React.cloneElement(node, {value: index})

    render() {
      const {children, ...props} = this.props
      return (
        <Col flex={1} {...props}>
          <TabBar>{React.Children.map(children, this.renderTabBar)}</TabBar>
          {React.Children.map(children, this.renderTab)}
        </Col>
      )
    }
  }
)
