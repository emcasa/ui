import React from 'react'

import {action} from '@storybook/addon-actions'
import {withInfo} from '@storybook/addon-info'

export default ({storiesOf}, {Button}) => {
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
}
