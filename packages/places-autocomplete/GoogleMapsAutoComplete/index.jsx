/* eslint-disable */
import debounce from 'lodash/debounce'
import isObject from 'lodash/isObject'
import pick from 'lodash/pick'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Dropdown from '@emcasa/ui-dom/components/Dropdown'
import Spinner from './Spinner'
import Message from './Message'
import {placesAutoCompleteSessionToken} from '@google/maps/lib/util'

const ABORT_CONTROLLER_SUPPORT = process.browser && 'AbortController' in window

const dropdownProps = [
  'height',
  'hideTrailingIcon',
  'leadingIconProps'
]
const inputProps = ['height', 'placeholder']

export default class GoogleMapsAutoComplete extends PureComponent {
  static API_ENDPOINT = 'autocomplete'

  static propTypes = {
    /** Base url where the maps middleware is mounted */
    apiUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    /** Fetch options */
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    /** Dropdown height - BUTTON_HEIGHT from packages/ui/src/theme/measures.js */
    height: PropTypes.string,
    /** Dropdown container props */
    containerProps: PropTypes.object,
    /** Input component props */
    inputProps: PropTypes.object,
    /** Render dropdown content when predictions are loading */
    renderLoading: PropTypes.func,
    /** Render dropdown content for empty results */
    renderEmpty: PropTypes.func,
    /** Render prediction dropdown option */
    renderPrediction: PropTypes.func.isRequired,
    /** Render components to the right side of the input */
    renderControls: PropTypes.func,
    /** Input blur event */
    onBlur: PropTypes.func,
    /** Input focus event */
    onFocus: PropTypes.func,
    /** Input onChange event */
    onChangeText: PropTypes.func,
    /** Called place predictions are loaded */
    onLoadPredictions: PropTypes.func,
    /** Called when a place is selected from the dropdown */
    onSelect: PropTypes.func,
    /** Input component ref */
    inputRef: PropTypes.any
  }

  static defaultProps = {
    apiUrl: '/maps',
    options: {mode: 'same-origin'},
    height: 'medium',
    hideTrailingIcon: true,
    leadingIconProps: {
      name: 'map-marker-alt',
      color: 'grey300'
    },
    inputProps: {},
    renderLoading: () => <Spinner />,
    renderEmpty: ({value}) => (
      <Message>
        {value
          ? 'Endereço não encontrado. Tente outros termos.'
          : 'Digite um endereço para buscar.'}
      </Message>
    ),
    renderPrediction: ({description, place_id}) => (
      <Dropdown.Option key={place_id} value={place_id} iconProps={{
        name: 'map-marker',
        color: 'grey300'
      }}>
        {description}
      </Dropdown.Option>
    ),
    sessionToken: placesAutoCompleteSessionToken(),
    get inputRef() {
      return React.createRef()
    }
  }

  state = {
    predictions: [],
    focus: false,
    error: undefined,
    loading: false,
    value: ''
  }

  static getDerivedStateFromProps(props, state) {
    return {
      focused:
        typeof props.focused !== 'undefined' ? props.focused : state.focused,
      error: typeof props.error !== 'undefined' ? props.error : state.error,
      predictions: props.predictions || state.predictions,
      value: props.value || state.value
    }
  }

  getUrl() {
    const {apiUrl, sessionToken} = this.props
    const {value} = this.state
    const endpoint = this.constructor.API_ENDPOINT
    const queryString = `q=${encodeURI(value)}&sessionToken=${sessionToken}`
    if (typeof apiUrl === 'function')
      return apiUrl({sessionToken, endpoint, queryString, ...this.state})
    return `${apiUrl}/${endpoint}?${queryString}`
  }

  loadPredictions = debounce(async () => {
    const {options, onLoadPredictions} = this.props
    const {value, loading} = this.state
    const endpoint = this.constructor.API_ENDPOINT
    if (!value) return
    if (loading) this.abort()
    else this.setState({loading: true, error: undefined})
    try {
      if (ABORT_CONTROLLER_SUPPORT) this.fetchController = new AbortController()
      const response = await window.fetch(
        this.getUrl(),
        typeof options === 'function'
          ? options({endpoint, ...this.state})
          : options
      )
      const {predictions = []} = await response.json()
      if (onLoadPredictions) onLoadPredictions(predictions, value)
      this.setState({loading: false, predictions})
    } catch (error) {
      this.setState({loading: false, focused: true, error})
    } finally {
      this.fetchController = undefined
    }
  }, 200)

  abort = () => {
    const {loading} = this.state
    if (loading && this.fetchController) this.fetchController.abort()
  }

  reset = () =>
    this.setState({
      value: '',
      loading: false,
      error: undefined,
      predictions: []
    })

  blur = () => this.setState({focused: false}, this.props.onBlur)

  focus = () => this.setState({focused: true}, this.props.onFocus)

  changeText = (e) => {
    const value = isObject(e) ? e.target.value : e
    if (this.props.onChangeText) this.props.onChangeText(value)
    if (!this.state.focused) this.props.onFocus()
    this.setState({value, focused: true}, this.loadPredictions)
  }

  selectPlace = (placeId) => {
    const place = this.state.predictions.find(
      (place) => place.place_id === placeId
    )
    if (!place) return
    if (this.props.onSelect) this.props.onSelect(place)
    this.setState({value: place.description})
  }

  render() {
    const {
      renderLoading,
      renderEmpty,
      renderPrediction,
      renderControls,
      ...props
    } = this.props
    const {focused, loading, value, error, predictions} = this.state
    return (
      <Dropdown
        focused={focused}
        inputProps={{
          ref: this.props.inputRef,
          autoComplete: "new-password",
          value: value,
          onChange: this.changeText,
          ...pick(props, inputProps),
          ...props.inputProps
        }}
        onFocus={this.focus}
        onBlur={this.blur}
        onChange={this.selectPlace}
        {...pick(props, dropdownProps)}
      >
        {error ? (
          <Message error>
            {error.message}
          </Message>
        ) : loading && !predictions.length ? (
          renderLoading(this.state)
        ) : predictions && predictions.length ? (
          predictions.map(renderPrediction)
        ) : (
          renderEmpty(this.state)
        )}
      </Dropdown>
    )
  }
}
