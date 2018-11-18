import React from 'react'

import {storiesOf} from '@storybook/react-native'
import {action} from '@storybook/addon-actions'

import {View, Dropdown, Text, Icon} from '@emcasa/ui-native'

const story = storiesOf('Dropdown', module)

story.add('basic', () => (
  <View flexDirection="column">
    <Dropdown onChange={action('selected')}>
      <Dropdown.Option value="a">Option A</Dropdown.Option>
      <Dropdown.Option value="b">Option B</Dropdown.Option>
      <Dropdown.Option value="c">Option C</Dropdown.Option>
    </Dropdown>
  </View>
))

story.add('icons', () => (
  <View flexDirection="column">
    <Dropdown
      icon="heart"
      iconProps={{color: 'red'}}
      placeholder="What's your favorite snack?"
      onChange={action('selected')}
    >
      <Dropdown.Option value="apple" label="Apple">
        <Icon name="apple-alt" mr="10px" />
        <Text>Apple</Text>
      </Dropdown.Option>
      <Dropdown.Option value="lemon" label="Lemon">
        <Icon name="lemon" mr="10px" />
        <Text>Lemon</Text>
      </Dropdown.Option>
      <Dropdown.Option value="cookie" label="Cookie">
        <Icon name="cookie" mr="10px" />
        <Text>Cookie</Text>
      </Dropdown.Option>
      <Dropdown.Option value="stroopwafel" label="Stroopwafel">
        <Icon name="stroopwafel" mr="10px" />
        <Text>Stroopwafel</Text>
      </Dropdown.Option>
    </Dropdown>
  </View>
))
