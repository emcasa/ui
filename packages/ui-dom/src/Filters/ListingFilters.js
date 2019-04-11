import React from 'react'
import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'
import isEmpty from 'lodash/isEmpty'
import identity from 'lodash/identity'
import join from 'lodash/fp/join'
import flow from 'lodash/fp/flow'
import cond from 'lodash/fp/cond'
import not from 'lodash/fp/negate'
import stubTrue from 'lodash/fp/stubTrue'
import abbrev from 'number-abbreviate'
import {MIN_PRICE, MAX_PRICE, MIN_AREA, MAX_AREA} from './constants'
import ButtonGroupFilter from './ButtonGroupFilter'
import ButtonRangeFilter from './ButtonRangeFilter'
import SliderRangeFilter from './SliderRangeFilter'
import FilterButton from './FilterButton'

const hasValue = (value) => typeof value !== 'undefined'

const formatRange = (formatOptions) => {
  const formatFn =
    (isFunction(formatOptions) ? formatOptions : formatOptions.format) ||
    identity
  const fmt = Object.assign(
    {
      format: formatFn,
      empty: formatFn,
      max: formatFn,
      min: formatFn,
      range: formatFn
    },
    isObject(formatOptions) ? formatOptions : undefined
  )
  return cond([
    [({min, max}) => !min && !max, fmt.empty],
    [({min, max}) => min == max, ({min}) => fmt.format(min)],
    [({min}) => !min, ({max}) => fmt.max(max)],
    [({max}) => !max, ({min}) => fmt.min(min)],
    [stubTrue, ({min, max}) => fmt.range(min, max)]
  ])
}

const formatSliderRange = (format) => (range) =>
  flow(
    (value) => {
      if (!value) return value
      return {
        min: value.min > range[0] ? value.min : undefined,
        max: value.max < range[1] ? value.max : undefined
      }
    },
    formatRange({
      format,
      empty: () => `${format(range[0])} - ${format(range[1])}`,
      max: (value) => `Até ${format(value)}`,
      min: (value) => `A partir de ${format(value)}`,
      range: (min, max) => `${format(min)} - ${format(max)}`
    })
  )

const formatNumRange = (noun) => {
  const singular = noun
  const plural = `${noun}s`
  return formatRange({
    format: (value) => `${value} ${value === 1 ? singular : plural}`,
    empty: () => `Sem ${plural}`,
    min: (value) => `${value}+ ${value === 1 ? singular : plural}`,
    max: (value) => `Até ${value} ${value === 1 ? singular : plural}`,
    range: (min, max) => `De ${min} a ${max} ${plural}`
  })
}

const formatPriceRange = formatSliderRange(
  (value) =>
    `R$ ${abbrev(value, 2)
      .toString()
      .toUpperCase()
      .replace('.', ',')}`
)

const formatAreaRange = formatSliderRange((value) => `${value} m²`)

const PriceFilter = ({...props}) => (
  <SliderRangeFilter
    formatValue={(value) => Math.round(value / 1000) * 1000}
    formatLabel={cond([
      [not(hasValue), () => 'Preço'],
      [stubTrue, formatPriceRange(props.range)]
    ])}
    {...props}
  />
)

PriceFilter.initialValue = {min: MIN_PRICE, max: MAX_PRICE}

PriceFilter.defaultProps = {
  name: 'price',
  title: 'Preço',
  range: [PriceFilter.initialValue.min, PriceFilter.initialValue.max]
}

const AreaFilter = ({...props}) => (
  <SliderRangeFilter
    formatValue={Math.round}
    formatLabel={cond([
      [not(hasValue), () => 'Área'],
      [stubTrue, formatAreaRange(props.range)]
    ])}
    {...props}
  />
)

AreaFilter.initialValue = {min: MIN_AREA, max: MAX_AREA}

AreaFilter.defaultProps = {
  name: 'area',
  label: 'Área',
  title: 'Área',
  range: [AreaFilter.initialValue.min, AreaFilter.initialValue.max]
}

const RoomsFilter = ({...props}) => (
  <ButtonRangeFilter
    formatEmpty={() => 'Sem quartos'}
    formatLast={() => '+'}
    {...props}
  />
)

RoomsFilter.defaultProps = {
  name: 'rooms',
  formatLabel: cond([
    [not(hasValue), () => 'Quartos'],
    [stubTrue, formatNumRange('quarto')]
  ]),
  title: 'Quartos',
  range: [1, 5]
}

const GarageSpotsFilter = ({...props}) => (
  <ButtonRangeFilter
    formatEmpty={() => 'Sem vagas'}
    formatLast={() => '+'}
    {...props}
  />
)

GarageSpotsFilter.defaultProps = {
  name: 'garageSpots',
  title: 'Vagas de garagem',
  formatLabel: cond([
    [not(hasValue), () => 'Vagas'],
    [stubTrue, formatNumRange('vaga')]
  ]),
  range: [0, 5]
}

const TypesFilter = ({buttonProps, ...props}) => (
  <ButtonGroupFilter strategy="multi" {...props}>
    <FilterButton {...buttonProps} value="Casa">
      Casa
    </FilterButton>
    <FilterButton {...buttonProps} value="Apartamento">
      Apartamento
    </FilterButton>
    <FilterButton {...buttonProps} value="Cobertura">
      Cobertura
    </FilterButton>
  </ButtonGroupFilter>
)

TypesFilter.defaultProps = {
  name: 'types',
  formatLabel: cond([
    [isEmpty, () => 'Tipos de imóvel'],
    [stubTrue, join(', ')]
  ]),
  title: 'Tipos de imóveis',
  buttonProps: {}
}

export {PriceFilter, AreaFilter, RoomsFilter, GarageSpotsFilter, TypesFilter}
