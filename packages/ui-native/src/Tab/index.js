import pick from 'lodash.pick'
import React, {PureComponent} from 'react'
import {TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Group from '@emcasa/ui/lib/components/Group'
import TabGroup from '@emcasa/ui/lib/components/Tab/Group'
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
const TabBarButton = styled(({children, style, onSelect, ...props}) => (
  <TouchableOpacity style={style} onPress={onSelect}>
    <TabBarText {...props}>{children}</TabBarText>
  </TouchableOpacity>
))`
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

/**
 * TabBar
 */
const Tab = styled(safe.View)`
  ${tab.container};
`

export default Tab

Tab.displayName = 'Tab'

Tab.propTypes = tab.container.propType

Tab.Group = TabGroup({
  TabBarButton,
  TabBar
})(
  styled(Col)`
    width: 100%;
    flex: 1;
  `
)
