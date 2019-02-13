import pick from 'lodash/fp/pick'
import React, {PureComponent} from 'react'
import {Formik} from 'formik'
import Group from '@emcasa/ui/lib/components/Group'
import {Container, Form, Body, Background} from './styles'
import {withBreakpoint} from '../Breakpoint'

const FilterGroup = Group(
  pick([
    'onSelect',
    'selected',
    'selectedValue',
    'disabled',
    'contentRef',
    'containerRef',
    'isMobile'
  ]),
  (node) => node.props.name
)(
  class FilterGroup extends PureComponent {
    static defaultProps = {
      strategy: 'switchable',
      get contentRef() {
        return React.createRef()
      },
      get containerRef() {
        return React.createRef()
      }
    }

    render() {
      const {
        children,
        initialValues = {},
        selectedValue,
        onSelect,
        containerRef,
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
                innerRef={containerRef}
                pose={isOpen && isMobile ? 'open' : 'closed'}
                initialPose="closed"
                onSubmit={form.handleSubmit}
                {...props}
                {...this.state}
              >
                <Body>
                  {React.Children.map(children, (element) =>
                    React.cloneElement(element, this.state)
                  )}
                </Body>
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

export default withBreakpoint()(FilterGroup)
