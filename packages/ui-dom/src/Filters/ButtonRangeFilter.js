import React from 'react'
import PropTypes from 'prop-types'
import ButtonGroupFilter from './ButtonGroupFilter'
import FilterButton from './FilterButton'

export const selectStrategy = ({range: [_, max]}) => ({
  isSelected(range, value) {
    return range && range.min === value
  },
  update(_, value) {
    return {min: value, max: value == max ? undefined : value}
  }
})

export default function ButtonRangeFilter({
  range: [min, max],
  formatText,
  formatEmpty = formatText,
  formatFirst = formatText,
  formatLast = formatText,
  buttonProps,
  ...props
}) {
  return (
    <ButtonGroupFilter
      strategy={selectStrategy({range: [min, max]})}
      {...props}
    >
      {Array(max - min + 1)
        .fill(null)
        .map((_, index) => {
          const value = index + min
          const input = {index, value}
          return (
            <FilterButton key={index} value={value} {...buttonProps}>
              {value == 0
                ? formatEmpty(input)
                : index == 0
                  ? formatFirst(input)
                  : value == max
                    ? formatLast(input)
                    : formatText(input)}
            </FilterButton>
          )
        })}
    </ButtonGroupFilter>
  )
}

ButtonRangeFilter.selectStrategy = selectStrategy

ButtonRangeFilter.defaultProps = {
  formatText: ({value}) => value,
  buttonProps: {}
}

ButtonRangeFilter.propTypes = {
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
  formatText: PropTypes.func,
  formatEmpty: PropTypes.func,
  formatFirst: PropTypes.func,
  formatLast: PropTypes.func,
  buttonProps: PropTypes.object
}
