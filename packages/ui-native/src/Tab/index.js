import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import TabGroup from '@emcasa/ui/lib/components/Tab/Group'
import * as tab from '@emcasa/ui/lib/components/Tab'

import {omitLayoutProps, omitTextStyleProps} from '../utils/omitProps'
import Col from '../Col'

/**
 * TabBar
 */
const TabBar = styled(omitLayoutProps(View))`
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
const TabBarText = styled(omitTextStyleProps(Text))`
  ${tab.tabBarText};
`

TabBarText.displayName = 'TabBarText'

TabBarText.propTypes = tab.tabBarText.propTypes

/**
 * TabBar
 */
const Tab = styled(omitLayoutProps(View))`
  ${tab.container};
`

export default Tab

Tab.displayName = 'Tab'

Tab.propTypes = tab.container.propTypes

Tab.Group = TabGroup({
  TabBarButton,
  TabBar
})(
  styled(Col)`
    width: 100%;
    flex: 1;
  `
)
