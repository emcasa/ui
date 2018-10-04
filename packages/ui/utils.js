import {css} from 'styled-components'
import {style} from 'styled-system'

export const styleSheet = (styles, ...interpolations) => (props) =>
  css(
    styles,
    ...interpolations.map(
      (fun) => (typeof fun === 'function' ? fun(props) : fun)
    )
  ).join('')

export const enumerated = (styleFn) => (Enum, prop) => (props) => {
  const value = props[prop]
  const nextProps = {...props}
  if (Enum && typeof value == 'string' && value in Enum)
    nextProps[prop] = Enum[value]
  return styleFn(nextProps)
}

export const enumeratedStyle = ({enum: Enum, ...args}) =>
  enumerated(style(args))(Enum, args.prop)
