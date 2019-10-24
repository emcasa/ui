import curry from 'lodash/curry'

export const filterComponent = curry((components, property) =>
  components.find((component) => component.types.includes(property))
)

export const filterComponentName = curry(
  (components, property) =>
    (filterComponent(components, property) || {}).long_name
)
