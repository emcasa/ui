import pick from 'lodash.pick'
import React from 'react'
import styled from 'styled-components'
import TabGroup from '@emcasa/ui/lib/components/Tab/Group'
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
const TabBarButton = styled(({onSelect, ...props}) => (
  <button onClick={onSelect} {...props} />
))`
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
 * Tab
 */
const Tab = styled.div`
  ${tab.container};
`

export default Tab

Tab.displayName = 'Tab'

Tab.propTypes = tab.container.propTypes

Tab.Group = TabGroup({TabBarButton, TabBar})(Col)
