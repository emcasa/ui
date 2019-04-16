import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import {Field, connect} from 'formik'
import {mapProps, compose} from 'recompose'
import {Manager, Reference, Popper} from 'react-popper'
import {PanelButton, Panel, Title} from './styles'
import View from '../View'
import Row from '../Row'
import FilterButton from './FilterButton'

const popperModifiers = {
  offset: {
    fn(data) {
      if (data.placement.indexOf('top') !== -1) {
        data.offsets.popper.top -= 10
      }
      return data
    }
  }
}

export default class Filter extends PureComponent {
  static defaultProps = {
    panelProps: {}
  }

  get hasPanel() {
    return Boolean(this.props.children)
  }

  renderPanel(passProps = {}) {
    const {
      children,
      title,
      onClear,
      onSubmit,
      panelProps,
      hideFooter,
      isMobile
    } = this.props
    if (!this.hasPanel) return
    return (
      <Panel
        pose={isMobile ? 'mobile' : 'desktop'}
        {...panelProps}
        {...passProps}
      >
        {title && <Title>{title}</Title>}
        <Row className="panelBody">{children}</Row>
        {!hideFooter && (
          <Row className="panelFooter">
            {onClear && (
              <PanelButton isMobile={isMobile} onClick={onClear}>
                Limpar
              </PanelButton>
            )}
            {onSubmit && (
              <PanelButton active isMobile={isMobile} onClick={onSubmit}>
                Aplicar
              </PanelButton>
            )}
          </Row>
        )}
      </Panel>
    )
  }

  renderButton(passProps = {}) {
    const {
      label,
      formatLabel,
      selectedValue,
      selected,
      onSelect,
      hasValue,
      value,
      ...props
    } = this.props
    delete props.onClear
    delete props.onSubmit
    return (
      <View style={{position: 'static'}} {...passProps}>
        <FilterButton
          {...props}
          className="filterButton"
          selected={selected || hasValue}
          disabled={selectedValue && !selected}
          onClick={onSelect}
        >
          {formatLabel ? formatLabel(value, hasValue) : label}
        </FilterButton>
      </View>
    )
  }

  render() {
    const {selected, isFilterExpanded, contentRef} = this.props
    if (!selected || !this.hasPanel) return this.renderButton()
    else if (isFilterExpanded) {
      return (
        <>
          {this.renderButton()}
          {ReactDOM.createPortal(this.renderPanel(), contentRef.current)}
        </>
      )
    } else {
      return (
        <Manager>
          <Reference>{({ref}) => this.renderButton({ref})}</Reference>
          {ReactDOM.createPortal(
            <Popper
              positionFixed
              placement="bottom-start"
              modifiers={popperModifiers}
            >
              {({ref, style}) => this.renderPanel({ref, style})}
            </Popper>,
            contentRef.current
          )}
        </Manager>
      )
    }
  }
}

class ControlledFilterContainer extends PureComponent {
  static defaultProps = {
    isEmpty: (value) => typeof value === 'undefined'
  }

  state = {}

  constructor(props) {
    super(props)
    this.state.value = this.props.value
  }

  componentDidUpdate(prevProps) {
    const focusChanged = prevProps.selected !== this.props.selected
    const focusedFilter = this.props.selectedValue
    if (focusChanged) {
      if (
        focusedFilter &&
        focusedFilter !== this.props.name &&
        this.state.value !== this.props.value
      )
        this.props.setFieldValue(this.props.name, this.state.value)
      else if (!focusedFilter) this.setState({value: this.props.value})
    }
  }

  onChange = (value) => this.setState({value})

  render() {
    const {
      children,
      name,
      selected,
      onSelect,
      initialValues,
      isEmpty,
      ...props
    } = this.props
    const {value} = this.state
    return (
      <Field
        name={name}
        render={({field, form}) => {
          const initialValue = get(initialValues, name)
          const appliedValue = get(form.initialValues || {}, name)
          const fieldValue = field.value
          const hasValue = Boolean(
            !isEmpty(fieldValue) && !isEqual(fieldValue, initialValues[name])
          )
          return (
            <Filter
              {...props}
              selected={selected}
              value={hasValue ? fieldValue : undefined}
              hasValue={hasValue}
              onSelect={() => {
                if (selected) {
                  form.setFieldValue(name, value)
                  requestAnimationFrame(() => {
                    onSelect()
                    form.submitForm()
                  })
                } else {
                  onSelect()
                }
              }}
              onClear={() => {
                this.setState({value: undefined})
                form.setFieldValue(name, undefined)
                requestAnimationFrame(() => {
                  onSelect()
                  form.submitForm()
                })
              }}
              onSubmit={() => {
                form.setFieldValue(name, value)
                requestAnimationFrame(() => {
                  onSelect()
                  form.submitForm()
                })
              }}
            >
              {children({
                field: {
                  ...field,
                  currentValue: value,
                  appliedValue,
                  initialValue,
                  onChange: this.onChange
                },
                form
              })}
            </Filter>
          )
        }}
      />
    )
  }
}

export const ControlledFilter = compose(
  connect,
  mapProps(({formik, ...props}) => ({
    value: formik.values[props.name],
    setFieldValue: formik.setFieldValue,
    ...props
  }))
)(ControlledFilterContainer)
