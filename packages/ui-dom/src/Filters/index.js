import React from 'react'
import {Formik} from 'formik'
import {withContentRect} from 'react-measure'
import Group from '@emcasa/ui/lib/components/Group'
import {Container, Form, Body, Background} from './styles'
import {withBreakpoint} from '../Breakpoint'

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
  measureRef,
  isMobile,
  ...props
}) {
  const isOpen = Boolean(selectedValue)
  return (
    <Container>
      <Formik initialValues={initialValues}>
        {(form) => (
          <Form
            innerRef={measureRef}
            pose={isOpen && isMobile ? 'open' : 'closed'}
            onSubmit={form.handleSubmit}
            {...props}
          >
            <Body>{children}</Body>
          </Form>
        )}
      </Formik>
      <Background
        pose={isOpen ? 'open' : 'closed'}
        onDismiss={() => onSelect(undefined)}
      />
    </Container>
  )
})

FilterGroup.defaultProps = {
  ...FilterGroup.defaultProps,
  strategy: 'switchable'
}

export default withContentRect('bounds')(withBreakpoint()(FilterGroup))
