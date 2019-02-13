import React from 'react'
import {Formik} from 'formik'
import Group from '@emcasa/ui/lib/components/Group'
import {Form, Body, Background} from './styles'

const FilterGroup = Group(
  ({onSelect, selected, selectedValue, disabled}) => ({
    disabled,
    onSelect,
    selected,
    selectedValue
  }),
  (node) => node.props.name
)(function FilterGroup({
  children,
  initialValues = {},
  selectedValue,
  onSelect,
  ...props
}) {
  return (
    <Formik initialValues={initialValues}>
      {(form) => (
        <Form onSubmit={form.handleSubmit} {...props}>
          <Body>{children}</Body>
          {selectedValue && <Background onClick={() => onSelect(undefined)} />}
        </Form>
      )}
    </Formik>
  )
})

FilterGroup.defaultProps.strategy = 'switchable'

export default FilterGroup
