import pick from 'lodash.pick'
import React, {PureComponent} from 'react'
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
      activeColor: PropTypes.string
    }

    static defaultProps = {
      initialValue: 0,
      ...tab.defaultProps
    }

    renderTabBar = (node, index) => {
      const {onSelect, borderColor, ...props} = this.props
      return (
        <TabBarButton
          borderColor={borderColor}
          selected={node.props.selected}
          onPress={() => onSelect(index)}
        >
          <TabBarText {...TabBarText.getProps(props)}>
            {node.props.label}
          </TabBarText>
        </TabBarButton>
      )
    }

    render() {
      const {children, barHeight, ...props} = this.props
      return (
        <Col flex={1} {...props}>
          <TabBar height={barHeight}>
            {React.Children.map(children, this.renderTabBar)}
          </TabBar>
          {children}
        </Col>
      )
    }
  }
)
