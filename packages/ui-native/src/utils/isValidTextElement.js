const isScalar = (value) =>
  value === null ||
  ['string', 'number', 'boolean', 'undefined', 'symbol'].includes(typeof value)

export default function isScalarElement(element) {
  return Array.isArray(element)
    ? element.reduce((result, value) => result && isScalar(value), true)
    : isScalar(element)
}
