import React from 'react'

import {storiesOf} from '@storybook/react-native'
import {action} from '@storybook/addon-actions'

import {View, Dropdown, Text, Icon} from '@emcasa/ui-native'

const story = storiesOf('Dropdown', module)

story.add('basic', () => (
  <View flexDirection="column">
    <Dropdown onChange={action('selected')}>
      <Dropdown.Option value="a">Option A</Dropdown.Option>
      <Dropdown.Option value="b">Option B</Dropdown.Option>
      <Dropdown.Option value="c">Option C</Dropdown.Option>
    </Dropdown>
  </View>
))
