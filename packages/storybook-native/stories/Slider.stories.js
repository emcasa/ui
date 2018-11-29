import React from 'react'
import {storiesOf} from '@storybook/react-native'
import {action} from '@storybook/addon-actions'

import {View, Slider} from '@emcasa/ui-native'

const story = storiesOf('Slider', module)

story.add('basic', () => (
  <View flexDirection="column">
    <Slider
      onChange={action('slider changed')}
      range={[0, 1]}
      initialValue={{
        min: 0,
        max: 1
      }}
    >
      <Slider.Marker name="min" />
      <Slider.Marker name="max" />
    </Slider>
  </View>
))
