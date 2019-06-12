import React, {PureComponent} from 'react'
import {filterComponent} from '../helpers'
import GoogleMapsAutoComplete from '../GoogleMapsAutoComplete'

export class AddressAutoComplete extends PureComponent {
  static API_ENDPOINT = 'details'

  static defaultProps = {
    apiUrl: '/maps',
    format({structured_formatting}) {
      return (
        structured_formatting.main_text +
        ' - ' +
        structured_formatting.secondary_text
      )
    },
    get inputRef() {
      return React.createRef()
    }
  }

  state = {
    focused: false,
    value: ''
  }

  constructor(props) {
    super(props)
    if (props.initialValue) {
      this.state.value = props.initialValue
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      focused:
        typeof props.focused !== 'undefined' ? props.focused : state.focused,
      value: props.value || state.value
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
    const {format, options, onSelect} = this.props
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
      const streetNumber = filterComponent(
        result.address_components,
        'street_number'
      ).long_name
      const postalCode = filterComponent(
        result.address_components,
        'postal_code'
      ).long_name
      if (!streetNumber || !postalCode)
        throw new Error('Não encontramos um endereço válido com esse número.')
      const value = format(place, result)
      this.setState({value, focused: false}, () => {
        if (onSelect) onSelect(place, result, value)
      })
    } catch (error) {
      this.setState({error, focused: true})
    } finally {
      this.setState({loading: false})
    }
  }

  blur = () => this.setState({focused: false}, this.props.onBlur)

  focus = () => this.setState({focused: true}, this.props.onFocus)

  changeText = (value) =>
    this.setState(
      {value, focused: true},
      this.props.onChangeText ? () => this.props.onChangeText(value) : undefined
    )

  selectPlace = (place) => {
    const [street, streetNumber] = place.structured_formatting.main_text.split(
      ','
    )
    if (!streetNumber) {
      const placeholder = 'número'
      this.setState({value: `${street}, ${placeholder}`}, () =>
        setTimeout(() => {
          if (!this.props.inputRef.current) return
          const start = street.length + 2
          this.props.inputRef.current.setSelectionRange(
            start,
            start + placeholder.length
          )
          this.props.inputRef.current.focus()
        }, 0)
      )
    } else this.loadPlace(place)
  }

  render() {
    const {autoCompleteRef, ...props} = this.props
    const {focused, value, error} = this.state
    return (
      <GoogleMapsAutoComplete
        {...props}
        ref={autoCompleteRef}
        error={error}
        value={value}
        focused={focused}
        onFocus={this.focus}
        onBlur={this.blur}
        onChangeText={this.changeText}
        onSelect={this.selectPlace}
      />
    )
  }
}

export default React.forwardRef((props, ref) => (
  <AddressAutoComplete autoCompleteRef={ref} {...props} />
))
