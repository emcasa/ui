import React from 'react'

import {storiesOf} from '@storybook/react-native'

import {View, Icon} from '@emcasa/ui-native'

const story = storiesOf('Icon', module)

story.add('basic', () => (
  <View flexDirection="column">
    <Icon name="cat" color="gray" mb={4} />
    <Icon name="feather" color="pink" size={30} />
  </View>
))
