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

story.add('track styles', () => (
  <View flexDirection="column">
    <Slider
      onChange={action('slider changed')}
      range={[0, 1]}
      initialValue={[0.5, 1]}
      trackProps={{bg: 'lightGrey'}}
    >
      <Slider.Marker trackProps={{bg: 'blue'}} />
      <Slider.Marker trackProps={{height: 4}} />
    </Slider>
  </View>
))

story.add('multiple markers', () => (
  <View flexDirection="column">
    <View mb="25px">
      <Slider onChange={action('slider changed')} range={[0, 1]}>
        <Slider.Marker />
      </Slider>
    </View>
    <View mb="25px">
      <Slider
        onChange={action('slider changed')}
        range={[0, 1]}
        initialValue={[0, 1]}
      >
        <Slider.Marker />
        <Slider.Marker />
      </Slider>
    </View>
    <View mb="25px">
      <Slider
        onChange={action('slider changed')}
        range={[0, 1]}
        initialValue={[0, 0.5, 1]}
      >
        <Slider.Marker />
        <Slider.Marker />
        <Slider.Marker />
      </Slider>
    </View>
  </View>
))
