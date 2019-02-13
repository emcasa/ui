import pick from 'lodash/fp/pick'
import React, {PureComponent} from 'react'
import {Formik} from 'formik'
import elementClass from 'element-class'
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
      get scrollContainer() {
        return typeof window === 'undefined' ? undefined : window.document.body
      },
      get contentRef() {
        return React.createRef()
      },
      get containerRef() {
        return React.createRef()
      }
    }

    state = {}

    static getDerivedStateFromProps(props) {
      return {
        isOpen: props.isMobile && Boolean(props.selectedValue)
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (
        this.props.scrollContainer &&
        prevState.isOpen !== this.state.isOpen
      ) {
        const classNames = elementClass(this.props.scrollContainer)
        if (this.state.isOpen) classNames.add('noscroll')
        else classNames.remove('noscroll')
      }
    }

    render() {
      const {
        children,
        initialValues = {},
        onSelect,
        containerRef,
        contentRef,
        isMobile,
        ...props
      } = this.props
      const {isOpen} = this.state
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
