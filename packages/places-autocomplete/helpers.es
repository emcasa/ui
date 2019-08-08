export const filterComponent = (components) => (property) => {
  return (
    components.filter((component) => component.types.includes(property))[0] ||
    {}
  ).long_name
}
