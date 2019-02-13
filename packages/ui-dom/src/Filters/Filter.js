import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import {Field} from 'formik'
import Tether from 'react-tether'
import {FilterButton, Panel, Title} from './styles'
import View from '../View'
import Row from '../Row'
import Button from '../Button'

const Link = ({isMobile, ...props}) => {
  const style = isMobile
    ? {}
    : {
        link: true,
        color: props.active ? 'pink' : 'grey',
        p: 0,
        height: 'auto',
        fontSize: 'small'
      }
  return <Button type="button" {...style} {...props} />
}

export default class Filter extends PureComponent {
  static defaultProps = {
    panelProps: {}
  }

  renderPanel() {
    const {
      children,
      title,
      onClear,
      onSubmit,
      panelProps,
      isMobile
    } = this.props
    if (!children) return
    return (
      <Panel pose={isMobile ? 'mobile' : 'desktop'} {...panelProps}>
        {title && <Title>{title}</Title>}
        <Row className="panelBody">{children}</Row>
        <Row className="panelFooter">
          <Link isMobile={isMobile} onClick={onClear}>
            Limpar
          </Link>
          <Link isMobile={isMobile} active onClick={onSubmit}>
            Aplicar
          </Link>
        </Row>
      </Panel>
    )
  }

  renderButton() {
    const {label, selectedValue, selected, onSelect, ...props} = this.props
    return (
      <View style={{position: 'static'}}>
        <FilterButton
          {...props}
          selected={selected}
          disabledStyle={selectedValue && !selected}
          onClick={onSelect}
        >
          {label}
        </FilterButton>
      </View>
    )
  }

  render() {
    const {selected, isExpanded, contentRef} = this.props
    const buttonElement = this.renderButton()
    let panelElement
    if (!selected || !(panelElement = this.renderPanel())) return buttonElement
    else if (isExpanded) {
      return (
        <>
          {buttonElement}
          {ReactDOM.createPortal(panelElement, contentRef.current)}
        </>
      )
    } else {
      return (
        <Tether
          attachment="top right"
          constraints={[
            {
              to: 'scrollParent',
              attachment: 'together'
            }
          ]}
          renderElementTo={contentRef.current}
          renderElement={(innerRef) =>
            React.cloneElement(panelElement, {innerRef})
          }
          renderTarget={(innerRef) =>
            React.cloneElement(buttonElement, {innerRef})
          }
        />
      )
    }
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
