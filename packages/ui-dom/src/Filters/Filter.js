import React, {PureComponent} from 'react'
import {Field} from 'formik'
import {FilterButton, Panel} from './styles'
import View from '../View'
import Row from '../Row'
import Button from '../Button'
import {withBreakpoint} from '../Breakpoint'

const Link = withBreakpoint()(({isMobile, ...props}) => {
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
})

export default class Filter extends PureComponent {
  static defaultProps = {
    panelProps: {}
  }

  render() {
    const {
      children,
      label,
      selectedValue,
      selected,
      onSelect,
      onClear,
      onSubmit,
      panelProps,
      contentRect,
      ...props
    } = this.props
    return (
      <View>
        <FilterButton
          {...props}
          color={selectedValue && !selected ? 'grey' : props.color}
          onClick={onSelect}
        >
          {label}
        </FilterButton>
        {selected && (
          <Panel {...panelProps} contentRect={contentRect}>
            <Row className="panelBody">{children}</Row>
            <Row className="panelFooter">
              <Link onClick={onClear}>Limpar</Link>
              <Link active onClick={onSubmit}>
                Aplicar
              </Link>
            </Row>
          </Panel>
        )}
      </View>
    )
  }
}

export class ControlledFilter extends PureComponent {
  static Button = Button

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
                value: value || field.value,
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
