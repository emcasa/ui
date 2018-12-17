import React from 'react'

import {storiesOf} from '@storybook/react-native'
import {action} from '@storybook/addon-actions'

import {View, Button} from '@emcasa/ui-native'

const story = storiesOf('Button', module)

story.add('basic', () => (
  <View flexDirection="column">
    <Button onClick={action('clicked')}>This is a button</Button>
    <View mt={2} />
    <Button active onClick={action('clicked')}>
      I'm active
    </Button>
    <View mt={2} />
    <Button disabled onClick={action("this won't fire")}>
      I'm disabled
    </Button>
    <Button link>Link</Button>
    <Button link disabled>
      Disabled link
    </Button>
  </View>
))

story.add('height', () => (
  <View style={{flexDirection: 'row'}}>
    <Button height="tall">Tall</Button>
    <Button>Medium</Button>
  </View>
))

story.add('grouped', () => (
  <View>
    <Button.Group onChange={action('changed')}>
      <Button value="a">Button A</Button>
      <Button value="B">Button B</Button>
      <Button value="C">Button C</Button>
    </Button.Group>
  </View>
))
