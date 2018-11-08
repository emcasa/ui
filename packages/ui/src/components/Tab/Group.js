import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Group from '../Group'
import {tabBar, tabBarButton, tabBarText} from './index'

export default ({TabBar, TabBarButton}) => (Target) =>
  Group(
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
        tabBarProps: PropTypes.shape(tabBar.propTypes),
        tabBarButtonProps: PropTypes.shape({
          ...tabBarButton.propTpes,
          ...tabBarText.propTypes
        })
      }

      static defaultProps = {
        initialValue: 0,
        color: 'grey',
        borderColor: 'pink'
      }

      renderTabBar = (node, index) => {
        const {onSelect, tabBarButtonProps, color, borderColor} = this.props
        return (
          <TabBarButton
            color={color}
            borderColor={borderColor}
            selected={node.props.selected}
            onSelect={() => onSelect(index)}
            {...tabBarButtonProps}
          >
            {node.props.label}
          </TabBarButton>
        )
      }

      render() {
        const {children, tabBarProps, ...props} = this.props
        return (
          <Target {...props}>
            <TabBar height="medium" {...tabBarProps}>
              {React.Children.map(children, this.renderTabBar)}
            </TabBar>
            {children}
          </Target>
        )
      }
    }
  )
