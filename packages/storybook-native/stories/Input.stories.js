import React from 'react'

import {storiesOf} from '@storybook/react-native'

import {View, Input} from '@emcasa/ui-native'

const story = storiesOf('Input', module)

story.add('simple', () => (
  <View>
    <Input placeholder="Just an input" />
  </View>
))

story.add('with label', () => (
  <View>
    <Input label="Label" placeholder="Input with label" />
  </View>
))
