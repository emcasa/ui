import pick from 'lodash/fp/pick'
import React, {PureComponent} from 'react'
import {Formik} from 'formik'
import {withContentRect} from 'react-measure'
import Group from '@emcasa/ui/lib/components/Group'
import {Container, Form, Body, Background} from './styles'
import {withBreakpoint} from '../Breakpoint'

const FilterGroup = Group(
  pick([
    'onSelect',
    'selected',
    'selectedValue',
    'disabled',
    'contentRect',
    'contentRef',
    'isMobile'
  ]),
  (node) => node.props.name
)(
  class FilterGroup extends PureComponent {
    static defaultProps = {
      strategy: 'switchable',
      get contentRef() {
        return React.createRef()
      }
    }

    render() {
      const {
        children,
        initialValues = {},
        selectedValue,
        onSelect,
        measureRef,
        contentRef,
        isMobile,
        ...props
      } = this.props
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
            contentRef={contentRef}
          />
        </Container>
      )
    }
  }
)

export default withContentRect('bounds')(withBreakpoint()(FilterGroup))
