import React from 'react'
import {Formik} from 'formik'
import {withContentRect} from 'react-measure'
import Group from '@emcasa/ui/lib/components/Group'
import {Form, Body, Background} from './styles'

const FilterGroup = Group(
  ({onSelect, selected, selectedValue, disabled, contentRect}) => ({
    disabled,
    onSelect,
    selected,
    selectedValue,
    contentRect
  }),
  (node) => node.props.name
)(function FilterGroup({
  children,
  initialValues = {},
  selectedValue,
  onSelect,
  measureRef,
  ...props
}) {
  return (
    <Formik initialValues={initialValues}>
      {(form) => (
        <Form innerRef={measureRef} onSubmit={form.handleSubmit} {...props}>
          <Body>{children}</Body>
          {selectedValue && (
            <Background onDismiss={() => onSelect(undefined)} />
          )}
        </Form>
      )}
    </Formik>
  )
})

FilterGroup.defaultProps.strategy = 'switchable'

export default withContentRect('bounds')(FilterGroup)
