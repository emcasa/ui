import React from 'react'

import {storiesOf} from '@storybook/react-native'

import {View, Input} from '@emcasa/ui-native'

const story = storiesOf('Input', module)

story.add('basic', () => (
  <View>
    <Input placeholder="Just an input" />
  </View>
))

story.add('labels and errors', () => (
  <View>
    <View mb="20px">
      <Input label="Label" placeholder="Input with label" />
    </View>
    <View mb="20px">
      <Input error="Error text" placeholder="Input with error" />
    </View>
  </View>
))

story.add('textarea', () => (
  <View>
    <Input area height={120} placeholder="A textarea" />
  </View>
))
