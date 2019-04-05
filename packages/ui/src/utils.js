import {style} from 'styled-system'

export const enumerated = (map, prop) => (styleFn) =>
  Object.assign((props) => {
    const value = props[prop]
    const nextProps = {...props}
    if (map && typeof value == 'string') {
      if (map.has(value)) nextProps[prop] = map.get(value)
    }
    return styleFn(nextProps)
  }, styleFn)

export const enumeratedStyle = ({map, ...args}) =>
  enumerated(map, args.prop)(style(args))

export const withProps = (overrideProps) => (css) =>
  css.map(
    (style) =>
      typeof style === 'function'
        ? (props) => style({...props, ...overrideProps})
        : style
  )
