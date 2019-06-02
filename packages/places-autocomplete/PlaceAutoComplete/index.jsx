import React, {PureComponent} from 'react'
import GoogleMapsAutoComplete from '../GoogleMapsAutoComplete'

export class PlaceAutoComplete extends PureComponent {
  static API_ENDPOINT = 'placeDetail'

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
    if (typeof apiUrl === 'function')
      return apiUrl({endpoint, place, ...this.state})
    else return `${apiUrl}/${endpoint}?q=${place.place_id}`
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
      if (onSelect) onSelect(place, result)
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
    const {focused} = this.state
    return (
      <GoogleMapsAutoComplete
        {...props}
        ref={autoCompleteRef}
        focused={focused}
        onFocus={this.focus}
        onBlur={this.blur}
      />
    )
  }
}

export default React.forwardRef((props, ref) => (
  <PlaceAutoComplete autoCompleteRef={ref} {...props} />
))
