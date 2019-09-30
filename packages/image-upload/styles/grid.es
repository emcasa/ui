import curry from 'lodash/curry'

export const GRID_SPACING = 1.5

export const DEFAULT_GRID = {
  columns: {
    desktop: 5,
    tablet: 4,
    phone: 2
  },
  styles: {}
}

export const getGridOptions = ({
  theme: {
    ImageUpload: {gridTypes, gridType, grid}
  }
}) => grid || gridTypes[gridType] || DEFAULT_GRID

export const gridSize = curry(
  (breakpoint, props) =>
    `${(1 / getGridOptions(props).columns[breakpoint]) * 100}%`
)

export const gridStyle = curry(
  (key, props) => getGridOptions(props).styles[key] || {}
)
