import isEqual from 'lodash/isEqual'
import pick from 'lodash/fp/pick'
import React, {PureComponent} from 'react'
import {Formik} from 'formik'
import elementClass from 'element-class'
import Group from '@emcasa/ui/lib/components/Group'
import {Container, Form, Body, Background} from './styles'
import {withBreakpoint} from '../Breakpoint'
import {compose, mapProps} from 'recompose'

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
      return {
        initialValues: state.initialValues || props.initialValues || {},
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

    render() {
      const {
        children,
        id,
        style,
        className,
        selectedValue,
        onSelect
      } = this.props
      const {isOpen, initialValues} = this.state
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
                pose={isOpen ? 'open' : 'closed'}
                initialPose="closed"
                onSubmit={(e) => {
                  e.preventDefault()
                  form.handleSubmit(e)
                }}
                {...this.state}
              >
                <Body>
                  {React.Children.map(children, (element) =>
                    React.cloneElement(element, {
                      isOpen: this.state.isOpen,
                      contentRef: this.contentRef,
                      containerRef: this.containerRef
                    })
                  )}
                </Body>
              </Form>
              <Background
                pose={selectedValue ? 'open' : 'closed'}
                onDismiss={() => {
                  form.handleReset()
                  onSelect(undefined)
                }}
                contentRef={this.contentRef}
              />
            </Container>
          )}
        </Formik>
      )
    }
  }
)

export default compose(
  withBreakpoint(),
  mapProps(({onSelectFilter, selectedFilter, ...props}) => ({
    onChange: onSelectFilter,
    selectedValue: selectedFilter,
    ...props
  }))
)(FilterGroup)
