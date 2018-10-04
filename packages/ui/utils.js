import {css} from 'styled-components'

export const styleSheet = (styles, ...interpolations) => (props) =>
  css(
    styles,
    ...interpolations.map(
      (fun) => (typeof fun === 'function' ? fun(props) : fun)
    )
  ).join('')
