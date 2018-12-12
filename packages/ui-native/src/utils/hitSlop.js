export function hitSlop(value) {
  if (!value || typeof value === 'object') return value
  return {
    top: value,
    bottom: value,
    left: value,
    right: value
  }
}
