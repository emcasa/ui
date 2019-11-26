import React, {PureComponent} from 'react'
import {filterComponentName} from '../helpers'
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

  get isControlled() {
    return (
      typeof this.props.value !== 'undefined' &&
      Boolean(this.props.onChangeText)
    )
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
    const {format, options, onSelect, validate} = this.props
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
      let error
      if (
        validate &&
        (error = validate(
          result,
          filterComponentName(result.address_components)
        ))
      )
        throw new Error(error)
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

  changeText = async (value) => {
    if (this.isControlled) return this.props.onChangeText(value)
    else
      return new Promise((resolve) =>
        this.setState({value, focused: true}, resolve)
      )
  }

  selectPlace = async (place) => {
    const [street, streetNumber] = place.structured_formatting.main_text.split(
      ','
    )
    if (!streetNumber) {
      const placeholder = 'número'
      await this.changeText(`${street}, ${placeholder}`)
      setTimeout(() => {
        if (!this.props.inputRef.current) return
        const start = street.length + 2
        this.props.inputRef.current.setSelectionRange(
          start,
          start + placeholder.length
        )
        this.props.inputRef.current.focus()
      }, 0)
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
