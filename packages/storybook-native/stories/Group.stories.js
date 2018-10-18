import React from 'react'

import {storiesOf} from '@storybook/react-native'
import {action} from '@storybook/addon-actions'

import {SelectGroup, Button, RadioButton} from '@emcasa/ui-native'

const story = storiesOf('RadioGroup', module)

story.add('radio group', () => (
  <SelectGroup initialValue="a" onChange={action('selected')}>
    <RadioButton label="Option 1" value="a" />
    <RadioButton label="Option 2" value="b" />
    <RadioButton label="Option 3" value="c" disabled />
  </SelectGroup>
))

story.add('button group', () => (
  <SelectGroup initialValue="a" onChange={action('selected')}>
    <Button value="a">Button A</Button>
    <Button value="b">Button B</Button>
    <Button value="c">Button C</Button>
  </SelectGroup>
)) 

story.add('multi select group', () => (
  <SelectGroup multi initialValue={['a', 'b']} onChange={action('selected')}>
    <Button value="a">Button A</Button>
    <Button value="b">Button B</Button>
    <Button value="c">Button C</Button>
    <Button value="d">Button D</Button>
  </SelectGroup>
))
