import debounce from 'lodash/debounce'
import isFunction from 'lodash/isFunction'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {withTheme} from 'styled-components'
import {breakpoint} from '@emcasa/ui/src/styles'
import Media from 'react-responsive'
import {BREAKPOINTS} from '@emcasa/ui/src/theme/measures'

export const BreakpointType = PropTypes.oneOfType([
  PropTypes.oneOf(BREAKPOINTS.keys()),
  PropTypes.number
])

export default withTheme(
  class Breakpoint extends PureComponent {
    static propTypes = {
      up: BreakpointType,
      down: BreakpointType,
      only: BreakpointType
    }

    render() {
      const {children, theme} = this.props
      let query
      const keys = ['only', 'up', 'down']
      for (const mode of keys) {
        if (this.props[mode]) {
          query = breakpoint[mode](this.props[mode])({theme})
          break
        }
      }
      return <Media query={query}>{children}</Media>
    }
  }
)

const getWindowWidth = () =>
  window.innerWidth || document.documentElement.clientWidth

export const getBreakpoint = (width = getWindowWidth()) => {
  let prev
  const iterator = BREAKPOINTS[Symbol.iterator]()
  for (const [name, bpWidth] of iterator) {
    if (parseInt(bpWidth) >= width) break
    prev = name
  }
  return {
    breakpoint: prev,
    isMobile: breakpoint.isMobile(prev)
  }
}

export class BreakpointProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    debounce: PropTypes.number.isRequired,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    debounce: 150
  }

  state = {
    breakpoint: undefined,
    isMobile: undefined
  }

  constructor(props) {
    super(props)
    this.update = debounce(this._update, props.debounce)
    if (!props.disabled) this.state = getBreakpoint()
  }

  _addEvents = () => {
    window.addEventListener('resize', this.update)
  }

  _removeEvents = () => {
    window.removeEventListener('resize', this.update)
  }

  _update = () => this.setState(getBreakpoint())

  componentDidUpdate(prevProps) {
    if (prevProps.debounce !== this.props.debounce) {
      this._removeEvents()
      this.update.cancel()
      this.update = debounce(this._update, this.props.debounce)
      this._addEvents()
    } else if (prevProps.disabled !== this.props.disabled) {
      if (!this.props.disabled) this._addEvents()
      else this._removeEvents()
    }
  }

  componentDidMount() {
    if (!this.props.disabled) this._addEvents()
  }

  componentWillUnmount() {
    if (!this.props.disabled) this._removeEvents()
  }

  render() {
    return this.props.children(this.state)
  }
}

export const withBreakpoint = (getOptions = {}) => (Target) => (props) => (
  <BreakpointProvider
    {...(isFunction(getOptions) ? getOptions(props) : getOptions)}
  >
    {(ctx) => <Target {...props} {...ctx} />}
  </BreakpointProvider>
)
