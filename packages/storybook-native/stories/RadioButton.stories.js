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
    <RadioButton label="Controlled RadioButton" value="b" checked />
    <RadioButton label="Disabled RadioButton" value="c" disabled />
  </View>
))

story.add('grouped', () => (
  <View>
    <RadioButton.Group onChange={action('changed')}>
      <RadioButton label="Option A" value="a" />
      <RadioButton label="Option B" value="B" />
      <RadioButton label="Option C" value="C" />
    </RadioButton.Group>
  </View>
))
