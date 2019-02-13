import React, {PureComponent} from 'react'
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
