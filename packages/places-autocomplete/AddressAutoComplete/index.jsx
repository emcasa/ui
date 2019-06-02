import React, {PureComponent} from 'react'
import {filterComponent} from '../helpers'
import GoogleMapsAutoComplete from '../GoogleMapsAutoComplete'

export default class AddressAutoComplete extends PureComponent {
  static defaultProps = {
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

  static API_ENDPOINT = 'placeDetail'

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

  loadPlace = async (place) => {
    const {format, options, apiUrl, onSelect} = this.props
    this.setState({loading: true, error: undefined})
    try {
      const endpoint = this.constructor.API_ENDPOINT
      const fetchUrl =
        typeof apiUrl === 'function'
          ? apiUrl({endpoint, place, ...this.state})
          : `${apiUrl}/${endpoint}?q=${place.place_id}`
      const fetchOptions =
        typeof options === 'function'
          ? options({endpoint, place, ...this.state})
          : options

      const response = await fetch(fetchUrl, fetchOptions)
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
      const value = format(result)
      this.setState({value, focused: false}, () => {
        if (onSelect) onSelect(place, response, value)
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
    const {focused, value, error} = this.state
    return (
      <GoogleMapsAutoComplete
        {...this.props}
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
