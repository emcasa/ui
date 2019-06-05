export function filterComponent(array, property) {
  return (
    array.filter((component) => component.types.includes(property))[0] || {}
  )
}
