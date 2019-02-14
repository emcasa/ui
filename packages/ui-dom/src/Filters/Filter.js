import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import {Field} from 'formik'
import {Manager, Reference, Popper} from 'react-popper'
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

  renderButton(passProps = {}) {
    const {label, selectedValue, selected, onSelect, ...props} = this.props
    return (
      <View style={{position: 'static'}} {...passProps}>
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
