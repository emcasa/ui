import debounce from 'lodash/debounce'
import isFunction from 'lodash/isFunction'
import React, {PureComponent} from 'react'
import hoistStatics from 'hoist-non-react-statics'
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment'
import PropTypes from 'prop-types'
import {withTheme} from 'styled-components'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Media from 'react-responsive'

export const BreakpointType = PropTypes.oneOfType([
  PropTypes.string,
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

export const getWindowWidth = () => {
  if (canUseDOM)
    return window.innerWidth || document.documentElement.clientWidth
}

export const getBreakpoint = ({width: windowWidth, theme}) => {
  let index = 0,
    name
  const width = windowWidth || getWindowWidth()
  for (; index < theme.breakpointNames.length; ++index) {
    if (parseInt(theme.breakpoints[index]) >= width) break
    name = theme.breakpointNames[index]
  }
  return {
    breakpoint: name,
    isMobile: breakpoint.isMobile(name)
  }
}

export const BreakpointProvider = withTheme(
  class BreakpointProvider extends PureComponent {
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
      if (canUseDOM && !props.disabled) this.state = getBreakpoint(props)
    }

    _addEvents = () => {
      window.addEventListener('resize', this.update)
    }

    _removeEvents = () => {
      window.removeEventListener('resize', this.update)
    }

    _update = () => this.setState(getBreakpoint(this.props))

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
      if (prevProps.width !== this.props.width) this._update()
    }

    componentDidMount() {
      if (canUseDOM && !this.props.disabled) this._addEvents()
    }

    componentWillUnmount() {
      if (canUseDOM && !this.props.disabled) this._removeEvents()
    }

    render() {
      return this.props.children(this.state)
    }
  }
)

export const withBreakpoint = (getOptions = {}) => (Target) =>
  hoistStatics(
    React.forwardRef((props, ref) => (
      <BreakpointProvider
        {...(isFunction(getOptions) ? getOptions(props) : getOptions)}
      >
        {(ctx) => <Target ref={ref} {...props} {...ctx} />}
      </BreakpointProvider>
    )),
    Target
  )
