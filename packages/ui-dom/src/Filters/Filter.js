import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import {Field} from 'formik'
import Measure from 'react-measure'
import View from '../View'
import Row from '../Row'
import FilterButton from './FilterButton'
import {Panel, PanelButton, Title} from './styles'

export default class Filter extends PureComponent {
  static defaultProps = {
    panelProps: {}
  }

  renderPanel(passProps) {
    const {
      children,
      title,
      onClear,
      onSubmit,
      panelProps,
      contentRect,
      contentRef,
      isOpen,
      isMobile
    } = this.props
    if (!children) return
    const panelElement = (
      <Panel
        pose={isMobile ? 'mobile' : 'desktop'}
        contentRect={contentRect}
        {...panelProps}
        {...passProps}
      >
        {title && <Title>{title}</Title>}
        <Row className="panelBody">{children}</Row>
        <Row className="panelFooter">
          <PanelButton isMobile={isMobile} onClick={onClear}>
            Limpar
          </PanelButton>
          <PanelButton active isMobile={isMobile} onClick={onSubmit}>
            Aplicar
          </PanelButton>
        </Row>
      </Panel>
    )
    if (!isOpen) {
      return panelElement
    } else if (contentRef.current) {
      return ReactDOM.createPortal(panelElement, contentRef.current)
    }
  }

  render() {
    const {
      label,
      selectedValue,
      hasValue,
      selected,
      onSelect,
      ...props
    } = this.props
    return (
      <Measure bounds>
        {({measureRef, contentRect: buttonRect}) => (
          <View innerRef={measureRef}>
            <FilterButton
              {...props}
              active={selected || hasValue}
              disabled={selectedValue && !selected}
              onClick={onSelect}
            >
              {label}
            </FilterButton>
            {selected && this.renderPanel({buttonRect})}
          </View>
        )}
      </Measure>
    )
  }
}

export class ControlledFilter extends PureComponent {
  state = {}

  static getDerivedStateFromProps(props) {
    if (!props.selected) return {value: null}
    return null
  }

  onChange = (value) => this.setState({value})

  render() {
    const {children, name, selected, onSelect, ...props} = this.props
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
              field.value && field.value !== form.initialValues[name]
            )}
            onClear={() => {
              this.setState({value: null})
              form.setFieldValue(name, undefined)
              requestAnimationFrame(onSelect)
            }}
            onSubmit={() => {
              form.setFieldValue(name, value)
              requestAnimationFrame(onSelect)
            }}
          >
            {children({
              field: {
                ...field,
                currentValue: value,
                initialValue: form.initialValues[name],
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
