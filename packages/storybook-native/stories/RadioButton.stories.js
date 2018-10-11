import React from 'react'

import {storiesOf} from '@storybook/react-native'
import {action} from '@storybook/addon-actions'

import {View, RadioButton} from '@emcasa/ui-native'

const story = storiesOf('RadioButton', module)

story.add('basic', () => (
  <View>
    <RadioButton
      label="Uncontrolled RadioButton"
      value="a"
      onChange={action('changed')}
    />
    <RadioButton label="Controlled RadioButton" value="a" checked />
    <RadioButton label="Disabled RadioButton" value="b" disabled />
  </View>
))
