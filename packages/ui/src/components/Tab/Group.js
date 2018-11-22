import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Group from '../Group'
import {tabBar, tabBarButton, tabBarText} from './index'

export default ({TabBar, TabBarButton}) => (Target) =>
  Group(({selected}) => ({selected}), (_, index) => index)(
    class TabGroup extends PureComponent {
      static propTypes = {
        color: PropTypes.string,
        activeColor: PropTypes.string,
        tabBarProps: PropTypes.shape(tabBar.propTypes),
        tabBarButtonProps: PropTypes.shape({
          ...tabBarButton.propTypes,
          ...tabBarText.propTypes
        }),
        ...(Target.propTypes || {})
      }

      static defaultProps = {
        initialValue: 0,
        color: 'grey',
        borderColor: 'pink',
        tabBarProps: {},
        tabBarButtonProps: {}
      }

      renderTabBar = (node, index) => {
        const {onChange, tabBarButtonProps, color, borderColor} = this.props
        return (
          <TabBarButton
            color={color}
            borderColor={borderColor}
            selected={node.props.selected}
            onSelect={() => onChange(index)}
            {...tabBarButtonProps}
          >
            {node.props.label}
          </TabBarButton>
        )
      }

      renderTab = (node) => (node.props.selected ? node : null)

      render() {
        const {children, tabBarProps, ...props} = this.props
        delete props.onChange
        return (
          <Target {...props}>
            <TabBar height="medium" {...tabBarProps}>
              {React.Children.map(children, this.renderTabBar)}
            </TabBar>
            {React.Children.map(children, this.renderTab)}
          </Target>
        )
      }
    }
  )
