import {css} from 'styled-components'
import {style} from 'styled-system'

export const styleSheet = (styles, ...interpolations) => {
  const fun = (props) =>
    css(
      styles,
      ...interpolations.map(
        (fun) => (typeof fun === 'function' ? fun(props) : fun)
      )
    ).join('')
  fun.withProps = (withProps) => (props) => fun({...props, ...withProps})
  return fun
}

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
