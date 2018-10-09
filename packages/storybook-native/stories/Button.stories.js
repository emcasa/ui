import React from 'react'
import {View} from 'react-native'

import {storiesOf} from '@storybook/react-native'
import {action} from '@storybook/addon-actions'

import {Button} from '@emcasa/ui-native'

const story = storiesOf('Button', module)

story.add('basic', () => (
  <View style={{flexDirection: 'column'}}>
    <Button onClick={action('clicked')}>This is a button</Button>
    <Button active onClick={action('clicked')}>
      I'm active
    </Button>
    <Button disabled onClick={action("this won't fire")}>
      I'm disabled
    </Button>
  </View>
))

story.add('height', () => (
  <View style={{flexDirection: 'row'}}>
    <Button height="tall">Tall</Button>
    <Button>Medium</Button>
  </View>
))
