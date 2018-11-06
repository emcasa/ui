import pick from 'lodash.pick'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Group from '@emcasa/ui/lib/components/Group'
import * as tab from '@emcasa/ui/lib/components/Tab'

import Col from '../Col'

/**
 * TabBar
 */
const TabBar = styled.div`
  ${tab.tabBar};
`

TabBar.displayName = 'TabBar'

TabBar.propTypes = tab.tabBar.propTypes

/**
 * TabBarButton
 */
const TabBarButton = styled.button`
  outline: none;
  cursor: pointer;
  ${tab.tabBarButton};
  ${tab.tabBarText};
`

TabBarButton.displayName = 'TabBarButton'

TabBarButton.propTypes = {
  ...tab.tabBarButton.propTypes,
  ...tab.tabBarText.propTypes
}

TabBarButton.getProps = (props) =>
  pick(props, Object.keys(TabBarButton.propTypes))

/**
 * TabBar
 */
const Tab = styled.div`
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
      borderColor: PropTypes.string
    }

    static defaultProps = {
      initialValue: 0,
      ...tab.defaultProps
    }

    renderTabBar = (node, index) => {
      const {onSelect} = this.props
      return (
        <TabBarButton
          selected={node.props.selected}
          onClick={() => onSelect(index)}
          {...TabBarButton.getProps(this.props)}
        >
          {node.props.label}
        </TabBarButton>
      )
    }

    renderTab = (node, index) => React.cloneElement(node, {value: index})

    render() {
      const {children, barHeight, ...props} = this.props
      return (
        <Col flex={1} {...props}>
          <TabBar height={barHeight}>
            {React.Children.map(children, this.renderTabBar)}
          </TabBar>
          {React.Children.map(children, this.renderTab)}
        </Col>
      )
    }
  }
)
