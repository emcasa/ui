import React from 'react'

import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {linkTo} from '@storybook/addon-links'
import {withInfo} from '@storybook/addon-info'

import Button from './index'

const story = storiesOf('Button', module)

story.add(
  'simple',
  withInfo('Button component')(() => (
    <div>
      <Button onClick={action('clicked')}>This is a button</Button>
      <p />
      <Button active onClick={action('clicked')}>
        I'm active
      </Button>
      <p />
      <Button disabled onClick={action("this won't fire")}>
        I'm disabled
      </Button>
    </div>
  ))
)

story.add(
  'height',
  withInfo('Button component')(() => (
    <div>
      <Button height="tall">Tall</Button>
      <p />
      <Button>Medium</Button>
    </div>
  ))
)
