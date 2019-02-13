import React from 'react'
import Group from '@emcasa/ui/lib/components/Group'
import Row from '../Row'
import {Formik} from 'formik'

const FilterGroup = Group(
  ({onSelect, selected, selectedValue, disabled}) => ({
    disabled,
    onSelect,
    selected,
    selectedValue
  }),
  (node) => node.props.name
)(function FilterGroup({children, initialValues = {}}) {
  return (
    <Formik initialValues={initialValues}>
      {(form) => <form onSubmit={form.handleSubmit}>{children}</form>}
    </Formik>
  )
})

FilterGroup.defaultProps.strategy = 'switchable'

export default FilterGroup
