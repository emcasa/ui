import React, {PureComponent} from 'react'
import GoogleMapsAutoComplete from '../GoogleMapsAutoComplete'

export class PlaceAutoComplete extends PureComponent {
  static API_ENDPOINT = 'details'

  static defaultProps = {
    apiUrl: '/maps'
  }

  state = {
    focused: false
  }

  static getDerivedStateFromProps(props, state) {
    return {
      focused:
        typeof props.focused !== 'undefined' ? props.focused : state.focused
    }
  }

  getUrl(place) {
    const {apiUrl} = this.props
    const endpoint = this.constructor.API_ENDPOINT
    const queryString = `q=${place.place_id}`
    if (typeof apiUrl === 'function')
      return apiUrl({endpoint, place, queryString, ...this.state})
    else return `${apiUrl}/${endpoint}?${queryString}`
  }

  loadPlace = async (place) => {
    const {options, onSelect} = this.props
    const endpoint = this.constructor.API_ENDPOINT
    this.setState({loading: true, error: undefined})
    try {
      const response = await fetch(
        this.getUrl(place),
        typeof options === 'function'
          ? options({endpoint, ...this.state})
          : options
      )
      const {result} = await response.json()
      if (onSelect) onSelect(place, result, place.description)
    } catch (error) {
      this.setState({focused: true, error})
    } finally {
      this.setState({loading: false})
    }
  }

  blur = () => this.setState({focused: false}, this.props.onFocus)

  focus = () => this.setState({focused: true}, this.props.onFocus)

  render() {
    const {autoCompleteRef, ...props} = this.props
    const {focused, error} = this.state
    return (
      <GoogleMapsAutoComplete
        {...props}
        ref={autoCompleteRef}
        focused={focused}
        error={error}
        onFocus={this.focus}
        onBlur={this.blur}
        onSelect={this.loadPlace}
      />
    )
  }
}

export default React.forwardRef((props, ref) => (
  <PlaceAutoComplete autoCompleteRef={ref} {...props} />
))
