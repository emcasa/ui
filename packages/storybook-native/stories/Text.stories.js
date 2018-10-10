import React from 'react'
import {View} from 'react-native'

import {storiesOf} from '@storybook/react-native'

import {Text} from '@emcasa/ui-native'

const story = storiesOf('Text', module)

story.add('simple', () => (
  <View style={{flexDirection: 'column'}}>
    <Text>This is a paragraph.</Text>
    <Text fontWeight="bold" color="pink">
      Styled text
    </Text>
    <Text fontSize="xlarge">This text is very large.</Text>
  </View>
))
