import React from 'react'

import {storiesOf} from '@storybook/react-native'
import {action} from '@storybook/addon-actions'

import {RadioGroup, RadioButton} from '@emcasa/ui-native'

const story = storiesOf('RadioGroup', module)

story.add('basic', () => (
  <RadioGroup initialValue="a" onChange={action('selected')}>
    <RadioButton label="Option 1" value="a" />
    <RadioButton label="Option 2" value="b" />
    <RadioButton label="Option 3" value="c" disabled />
  </RadioGroup>
))
