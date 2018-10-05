import {style} from 'styled-system'

export const enumerated = (styleFn) => (Enum, prop) => (props) => {
  const value = props[prop]
  const nextProps = {...props}
  if (Enum && typeof value == 'string') {
    const index = Enum.indexOf(value)
    if (index !== -1) nextProps[prop] = index
  }
  return styleFn(nextProps)
}

export const enumeratedStyle = ({enum: Enum, ...args}) =>
  enumerated(style(args))(Enum, args.prop)

export const withProps = (overrideProps) => (css) =>
  css.map(
    (style) =>
      typeof style === 'function'
        ? (props) => style({...props, ...overrideProps})
        : style
  )
