import React from 'react'

import {storiesOf} from '@storybook/react-native'

import {View, RadioButton} from '@emcasa/ui-native'

const story = storiesOf('RadioButton', module)

story.add('simple', () => (
  <View>
    <RadioButton label="Uncontrolled RadioButton" value="a" />
    <RadioButton label="Controlled RadioButton" value="a" checked />
    <RadioButton label="Disabled RadioButton" value="b" disabled />
  </View>
))
