import curry from 'lodash/curry'

export const GRID_SPACING = 1.5

export const getGridOptions = ({
  theme: {
    ImageUpload: {gridSize, gridSizes}
  }
}) => gridSizes[gridSize]

export const gridSize = curry(
  (breakpoint, props) =>
    `${(1 / getGridOptions(props).sizes[breakpoint]) * 100}%`
)

export const gridStyle = curry(
  (key, props) => getGridOptions(props).styles[key]
)
