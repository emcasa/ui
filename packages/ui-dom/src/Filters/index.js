import isEqual from 'lodash/isEqual'
import pick from 'lodash/fp/pick'
import React, {PureComponent} from 'react'
import {Formik} from 'formik'
import {withContentRect} from 'react-measure'
import {compose, mapProps} from 'recompose'
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

const ESC_KEY = 27

const isBrowser = typeof window !== 'undefined'

const FilterGroup = Group(
  pick([
    'onSelect',
    'selected',
    'selectedValue',
    'disabled',
    'isMobile',
    'initialValues'
  ]),
  (node) => node.props.name
)(
  class FilterGroup extends PureComponent {
    static defaultProps = {
      initialValues: {},
      contentRect: {bounds: {}},
      strategy: 'switchable',
      onSubmit: () => null,
      get scrollContainer() {
        return !isBrowser ? undefined : window.document.body
      }
    }

    formikRef = React.createRef()

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
        isRowExpanded: rowCount > 1 ? state.isRowExpanded : false,
        initialValues: state.initialValues || props.initialValues || {}
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
      if (!isEqual(prevProps.initialValues, this.props.initialValues)) {
        this.setState({initialValues: this.initialValues})
      }
    }

    componentDidMount() {
      if (isBrowser) window.addEventListener('keyup', this.onKeyPress)
    }

    componentWillUnmount() {
      if (isBrowser) window.removeEventListener('keyup', this.onKeyPress)
    }

    onKeyPress = (e) => {
      if (this.props.selectedValue && e.keyCode === ESC_KEY) {
        this.formikRef.current.handleReset()
        this.props.onSelect(undefined)
      }
    }

    onSubmit = (values) => {
      if (this.props.onSubmit) this.props.onSubmit(values)
      this.setState({initialValues: values})
    }

    onExpandRow = () => this.setState({isRowExpanded: true})

    onCollapseRow = () => this.setState({isRowExpanded: false})

    render() {
      const {
        children,
        id,
        style,
        className,
        selectedValue,
        onSelect,
        measureRef
      } = this.props
      const {
        initialValues,
        bodyHeight,
        rowCount,
        isFilterExpanded,
        isRowExpanded
      } = this.state
      return (
        <Formik
          ref={this.formikRef}
          enableReinitialize
          initialValues={initialValues}
          onSubmit={this.onSubmit}
        >
          {(form) => (
            <Container style={style} className={className}>
              <Form
                id={id}
                innerRef={this.containerRef}
                pose={isFilterExpanded ? 'filterOpen' : 'filterClosed'}
                initialPose="closed"
                onSubmit={(e) => {
                  e.preventDefault()
                  form.handleSubmit(e)
                }}
                {...this.state}
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
              <Background
                pose={selectedValue ? 'bgOpen' : 'bgClosed'}
                onDismiss={() => onSelect(undefined)}
                contentRef={this.contentRef}
                offset={bodyHeight}
                onDismiss={() => {
                  form.handleReset()
                  onSelect(undefined)
                }}
              />
            </Container>
          )}
        </Formik>
      )
    }
  }
)

export default compose(
  mapProps(({onSelectFilter, selectedFilter, ...props}) => ({
    onChange: onSelectFilter,
    selectedValue: selectedFilter,
    ...props
  })),
  withBreakpoint(),
  withContentRect('bounds'),
  withTheme
)(FilterGroup)
