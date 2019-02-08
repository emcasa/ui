import {BREAKPOINTS} from '../theme/measures'

const BreakpointNames = Array.from(BREAKPOINTS.keys()).reduce(
  (obj, key, index) => ({...obj, [key]: index}),
  {}
)

const getBreakpointIndex = (name) => {
  const index = BreakpointNames[name]
  return typeof index !== 'undefined' ? index : isNaN(name) ? undefined : name
}

export const up = (name) => ({theme}) => {
  const index = getBreakpointIndex(name)
  const minWidth = parseInt(theme.breakpoints[index])
  return `(min-width: ${minWidth}px)`
}

export const down = (name) => ({theme}) => {
  const index = getBreakpointIndex(name)
  const maxWidth = parseInt(theme.breakpoints[index + 1])
  return !isNaN(maxWidth)
    ? `(max-width: ${maxWidth - 1}px)`
    : '(min-width: 0px)'
}

export const only = (name) => ({theme}) => {
  const index = getBreakpointIndex(name)
  const minWidth = parseInt(theme.breakpoints[index])
  const maxWidth = parseInt(theme.breakpoints[index + 1])
  if (!isNaN(maxWidth))
    return `(min-width: ${minWidth}px) and (max-width: ${maxWidth - 1}px`
  else return `(min-width: ${minWidth}px)`
}

export default {up, down, only}
