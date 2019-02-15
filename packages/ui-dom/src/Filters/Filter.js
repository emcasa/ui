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
      selectedValue,
      selected,
      onSelect,
      hasValue,
      ...props
    } = this.props
    return (
      <View style={{position: 'static'}} {...passProps}>
        <FilterButton
          {...props}
          selected={selected || hasValue}
          disabled={selectedValue && !selected}
          onClick={onSelect}
        >
          {label}
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
          <Reference>{({ref}) => this.renderButton({innerRef: ref})}</Reference>
          <Popper placement="bottom-start">
            {({ref, style}) => this.renderPanel({innerRef: ref, style})}
          </Popper>
        </Manager>
      )
    }
  }
}

class ControlledFilterContainer extends PureComponent {
  state = {}

  componentDidUpdate(prevProps) {
    const focusChanged = prevProps.selected !== this.props.selected
    const focusedFilter = this.props.selectedValue
    if (focusChanged && focusedFilter && focusedFilter !== this.props.name)
      this.props.setFieldValue(this.props.name, this.state.value)
    else if (!focusedFilter && this.state.value) this.setState({value: null})
  }

  onChange = (value) => this.setState({value})

  render() {
    const {
      children,
      name,
      selected,
      onSelect,
      initialValues,
      ...props
    } = this.props
    const {value} = this.state
    return (
      <Field
        name={name}
        render={({field, form}) => (
          <Filter
            {...props}
            selected={selected}
            onSelect={onSelect}
            hasValue={Boolean(
              field.value !== null &&
                typeof field.value !== 'undefined' &&
                !isEqual(field.value, initialValues[name])
            )}
            onClear={() => {
              this.setState({value: null})
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
                appliedValue: form.initialValues[name],
                initialValue: initialValues[name],
                onChange: this.onChange
              },
              form
            })}
          </Filter>
        )}
      />
    )
  }
}

export const ControlledFilter = compose(
  connect,
  mapProps(({formik, ...props}) => ({
    setFieldValue: formik.setFieldValue,
    ...props
  }))
)(ControlledFilterContainer)
