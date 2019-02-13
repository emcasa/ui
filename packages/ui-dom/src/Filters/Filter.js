import React, {PureComponent} from 'react'
import {Field} from 'formik'
import {FilterButton, Panel} from './styles'
import View from '../View'
import Row from '../Row'
import Button from '../Button'

const Link = (props) => (
  <Button link type="button" p={0} height="auto" fontSize="small" {...props} />
)

export default class Filter extends PureComponent {
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
          <Panel {...panelProps}>
            {children}
            <Row mt={4} justifyContent="space-between">
              <Link color="grey" onClick={onClear}>
                Limpar
              </Link>
              <Link color="pink" onClick={onSubmit}>
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
