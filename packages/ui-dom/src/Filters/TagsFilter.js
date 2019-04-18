import React from 'react'
import isEmpty from 'lodash/fp/isEmpty'
import get from 'lodash/fp/get'
import cond from 'lodash/fp/cond'
import stubTrue from 'lodash/fp/stubTrue'
import styled, {withTheme} from 'styled-components'
import {maxHeight} from 'styled-system'
import TagInput from '../TagInput'
import {ControlledFilter} from './Filter'

const TagFilterInput = styled(TagInput).attrs({
  focused: true,
  labelProps: {
    maxRows: 2
  },
  containerProps: {
    style: {
      position: 'relative',
      top: 'unset',
      flex: '0 1 auto',
      flexFlow: 'row wrap',
      border: 'none',
      paddingRight: '10px',
      overflowY: 'auto'
    }
  }
})`
  height: auto;
  ${maxHeight};
`

const TagsFilter = withTheme(({theme, ...props}) => (
  <ControlledFilter
    isEmpty={isEmpty}
    panelProps={{width: parseInt(theme.breakpoints[1])}}
    {...props}
  >
    {({field}) => (
      <TagFilterInput
        {...props}
        selectedValue={field.currentValue || []}
        onChange={field.onChange}
      />
    )}
  </ControlledFilter>
))

const MAX_LABEL_LENGTH = 2

TagsFilter.defaultProps = {
  name: 'tags',
  maxHeight: ['100%', null, null, '50vh'],
  formatLabel: cond([
    [isEmpty, () => 'Tags'],
    [
      stubTrue,
      (values) =>
        values
          .map(get('name'))
          .slice(0, MAX_LABEL_LENGTH)
          .concat(
            values.length > MAX_LABEL_LENGTH
              ? `+ ${values.length - MAX_LABEL_LENGTH}`
              : []
          )
          .join(', ')
    ]
  ]),
  title: 'Tags'
}

export default TagsFilter
