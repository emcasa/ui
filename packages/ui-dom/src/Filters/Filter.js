import React, {PureComponent} from 'react'
import {Field} from 'formik'
import {FilterButton, Panel} from './styles'
import View from '../View'
import Row from '../Row'
import Button from '../Button'

export default class Filter extends PureComponent {
  render() {
    const {
      children,
      label,
      selected,
      onSelect,
      onClear,
      onSubmit,
      panelProps,
      ...props
    } = this.props
    return (
      <View>
        <FilterButton {...props} onClick={onSelect}>
          {label}
        </FilterButton>
        {selected && (
          <Panel {...panelProps}>
            {children}
            <Row justifyContent="space-between">
              <Button link type="button" color="grey" pl={0} onClick={onClear}>
                Limpar
              </Button>
              <Button link type="button" color="pink" pr={0} onClick={onSubmit}>
                Aplicar
              </Button>
            </Row>
          </Panel>
        )}
      </View>
    )
  }
}

export class ControlledFilter extends PureComponent {
  static Button = Button

  state = {value: undefined}

  onChange = (value) => this.setState({value})

  render() {
    const {children, label, name, selected, onSelect, panelProps} = this.props
    const {value} = this.state
    return (
      <Field
        name={name}
        render={({field, form}) => (
          <Filter
            label={label}
            panelProps={panelProps}
            selected={selected}
            onSelect={onSelect}
            onClear={() => {
              this.setState({value: null})
              form.setFieldValue(name, undefined)
            }}
            onSubmit={() => {
              form.setFieldValue(name, value)
              requestAnimationFrame(onSelect)
            }}
          >
            {children({
              field: {
                ...field,
                value,
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
