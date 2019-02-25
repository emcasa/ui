const getBreakpointIndex = (name, theme) => {
  const index = theme.breakpointNames.indexOf(name)
  return index !== -1 ? index : undefined
}

export const up = (name) => ({theme}) => {
  const index = getBreakpointIndex(name, theme)
  const minWidth = parseInt(theme.breakpoints[index])
  return `(min-width: ${minWidth}px)`
}

export const down = (name) => ({theme}) => {
  const index = getBreakpointIndex(name, theme)
  const maxWidth = parseInt(theme.breakpoints[index + 1])
  return !isNaN(maxWidth)
    ? `(max-width: ${maxWidth - 1}px)`
    : '(min-width: 0px)'
}

export const only = (name) => ({theme}) => {
  const index = getBreakpointIndex(name, theme)
  const minWidth = parseInt(theme.breakpoints[index])
  const maxWidth = parseInt(theme.breakpoints[index + 1])
  if (!isNaN(maxWidth))
    return `(min-width: ${minWidth}px) and (max-width: ${maxWidth - 1}px)`
  else return `(min-width: ${minWidth}px)`
}

export const isMobile = (name) => ['tablet', 'phone'].indexOf(name) !== -1

export default {up, down, only, isMobile}
