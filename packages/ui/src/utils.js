import {style} from 'styled-system'

export const enumerated = (Enum, prop) => (styleFn) =>
  Object.assign((props) => {
    const value = props[prop]
    const nextProps = {...props}
    if (Enum && typeof value == 'string') {
      const index = Enum.indexOf(value)
      if (index !== -1) nextProps[prop] = index
    }
    return styleFn(nextProps)
  }, styleFn)

export const enumeratedStyle = ({enum: Enum, ...args}) =>
  enumerated(Enum, args.prop)(style(args))

export const withProps = (overrideProps) => (css) =>
  css.map(
    (style) =>
      typeof style === 'function'
        ? (props) => style({...props, ...overrideProps})
        : style
  )
