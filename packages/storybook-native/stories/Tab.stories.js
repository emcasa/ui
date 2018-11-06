import React from 'react'

import {storiesOf} from '@storybook/react-native'

import {View, Tab, Text} from '@emcasa/ui-native'

const story = storiesOf('Tab', module)

story.add('basic', () => (
  <Tab.Group>
    <Tab label="A">
      <Text>Tab A</Text>
    </Tab>
    <Tab label="B">
      <Text>Tab B</Text>
    </Tab>
    <Tab label="C">
      <Text>Tab C</Text>
    </Tab>
  </Tab.Group>
))
