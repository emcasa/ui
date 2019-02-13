import pick from 'lodash/fp/pick'
import React, {PureComponent} from 'react'
import {Formik} from 'formik'
import {withContentRect} from 'react-measure'
import {compose} from 'recompose'
import {withTheme} from 'styled-components'
import elementClass from 'element-class'
import Group from '@emcasa/ui/lib/components/Group'
import {ROW_HEIGHT, Container, Form, Body, Background} from './styles'
import {withBreakpoint} from '../Breakpoint'

const FilterGroup = Group(
  pick(['onSelect', 'selected', 'selectedValue', 'disabled', 'isMobile']),
  (node) => node.props.name
)(
  class FilterGroup extends PureComponent {
    static defaultProps = {
      contentRect: {bounds: {}},
      strategy: 'switchable',
      get scrollContainer() {
        return typeof window === 'undefined' ? undefined : window.document.body
      }
    }

    contentRef = React.createRef()

    containerRef = React.createRef()

    state = {}

    static getDerivedStateFromProps(props, state) {
      const rowHeight =
        state.rowHeight || ROW_HEIGHT(props) - props.theme.space[2]
      return {
        rowHeight,
        rowCount: Math.ceil(props.contentRect.bounds.height / rowHeight) || 1,
        isExpanded: props.isMobile && Boolean(props.selectedValue)
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (
        this.props.scrollContainer &&
        prevState.isExpanded !== this.state.isExpanded
      ) {
        const classNames = elementClass(this.props.scrollContainer)
        if (this.state.isExpanded) classNames.add('noscroll')
        else classNames.remove('noscroll')
      }
    }

    render() {
      const {
        children,
        initialValues = {},
        selectedValue,
        onSelect,
        measureRef,
        ...props
      } = this.props
      const {rowCount, isExpanded} = this.state
      return (
        <Container>
          <Formik initialValues={initialValues}>
            {(form) => (
              <Form
                innerRef={this.containerRef}
                pose={isExpanded ? 'open' : 'closed'}
                initialPose="closed"
                onSubmit={form.handleSubmit}
                isExpanded={isExpanded}
                rowCount={rowCount}
                {...props}
              >
                <Body innerRef={measureRef}>
                  {React.Children.map(children, (element) =>
                    React.cloneElement(element, {
                      isExpanded: this.state.isExpanded,
                      contentRef: this.contentRef,
                      containerRef: this.containerRef
                    })
                  )}
                </Body>
              </Form>
            )}
          </Formik>
          <Background
            pose={selectedValue ? 'open' : 'closed'}
            onDismiss={() => onSelect(undefined)}
            contentRef={this.contentRef}
          />
        </Container>
      )
    }
  }
)

export default compose(
  withContentRect('bounds'),
  withBreakpoint(),
  withTheme
)(FilterGroup)
