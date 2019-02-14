import pick from 'lodash/fp/pick'
import React, {PureComponent} from 'react'
import {Formik} from 'formik'
import {withContentRect} from 'react-measure'
import {compose} from 'recompose'
import {withTheme} from 'styled-components'
import elementClass from 'element-class'
import Group from '@emcasa/ui/lib/components/Group'
import {ROW_HEIGHT} from './constants'
import {
  Container,
  Form,
  Body,
  BodyExpander,
  ExpandButton,
  Background
} from './styles'
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
      const bodyHeight = props.contentRect.bounds.height
      const rowHeight =
        state.rowHeight || ROW_HEIGHT(props) - props.theme.space[2]
      const rowCount = Math.ceil(bodyHeight / rowHeight) || 1
      return {
        bodyHeight,
        rowHeight,
        rowCount,
        isFilterExpanded: props.isMobile && Boolean(props.selectedValue),
        isRowExpanded: rowCount > 1 ? state.isRowExpanded : false
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

    onExpandRow = () => this.setState({isRowExpanded: true})

    onCollapseRow = () => this.setState({isRowExpanded: false})

    render() {
      const {
        children,
        initialValues = {},
        selectedValue,
        onSelect,
        measureRef,
        ...props
      } = this.props
      const {bodyHeight, rowCount, isFilterExpanded, isRowExpanded} = this.state
      return (
        <Container>
          <Formik initialValues={initialValues}>
            {(form) => (
              <Form
                innerRef={this.containerRef}
                pose={isFilterExpanded ? 'filterOpen' : 'filterClosed'}
                initialPose="closed"
                onSubmit={form.handleSubmit}
                {...props}
              >
                <BodyExpander
                  pose={isRowExpanded ? 'rowOpen' : 'rowClosed'}
                  initialPose="closed"
                  height={bodyHeight}
                >
                  <Body innerRef={measureRef}>
                    {React.Children.map(children, (element) =>
                      React.cloneElement(element, {
                        rowCount,
                        isRowExpanded,
                        isFilterExpanded,
                        containerRect: this.state.contentRect,
                        contentRef: this.contentRef,
                        containerRef: this.containerRef
                      })
                    )}
                  </Body>
                </BodyExpander>
                {rowCount > 1 && (
                  <ExpandButton
                    isRowExpanded={isRowExpanded}
                    onClick={
                      !isRowExpanded ? this.onExpandRow : this.onCollapseRow
                    }
                  />
                )}
              </Form>
            )}
          </Formik>
          <Background
            pose={selectedValue ? 'bgOpen' : 'bgClosed'}
            onDismiss={() => onSelect(undefined)}
            contentRef={this.contentRef}
            offset={bodyHeight}
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
