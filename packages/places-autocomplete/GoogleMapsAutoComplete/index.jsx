import debounce from 'lodash/debounce'
import isObject from 'lodash/isObject'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Dropdown from '@emcasa/ui-dom/components/Dropdown'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import {Input} from './styles'

const ABORT_CONTROLLER_SUPPORT = process.browser && 'AbortController' in window

export default class GoogleMapsAutoComplete extends PureComponent {
  static propTypes = {
    /** Url to /autocomplete endpoint */
    apiUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    headers: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    renderLoading: PropTypes.func,
    renderEmpty: PropTypes.func,
    renderPrediction: PropTypes.func.isRequired,
    onChangeText: PropTypes.func,
    onLoadPredictions: PropTypes.func,
    onSelect: PropTypes.func,
    inputRef: PropTypes.any
  }

  static defaultProps = {
    apiUrl: '/maps',
    headers: {mode: 'same-origin'},
    height: 'medium',
    icon: 'map-marker-alt',
    renderLoading: () => <div />,
    renderEmpty: ({value}) => (
      <Text inline>
        {value
          ? 'Digite um endereço para buscar.'
          : 'Endereço não encontrado. Tente outros termos.'}
      </Text>
    ),
    renderPrediction: ({description, place_id}) => (
      <Dropdown.Option key={place_id} value={place_id}>
        {description}
      </Dropdown.Option>
    ),
    sessionToken: new require(
      '@google/maps'
    ).util.placesAutoCompleteSessionToken(),
    get inputRef() {
      return React.createRef()
    }
  }

  state = {
    predictions: [],
    focus: false,
    value: ''
  }

  static getDerivedStateFromProps(props, state) {
    return {
      focused:
        typeof props.focused !== 'undefined' ? props.focused : state.focused,
      predictions: props.predictions || state.predictions,
      value: props.value || state.value
    }
  }

  loadPredictions = debounce(async () => {
    const {apiUrl, headers, sessionToken, onLoadPredictions} = this.props
    const {value, loading} = this.state
    if (!value) return
    if (loading) this.abort()
    else this.setState({loading: true, error: undefined})
    try {
      if (ABORT_CONTROLLER_SUPPORT) this.fetchController = new AbortController()
      const url =
        typeof apiUrl === 'function'
          ? apiUrl({sessionToken, ...this.state})
          : `${apiUrl}/autocomplete?q=${encodeURI(
              value
            )}&sessionToken=${sessionToken}`
      const response = await window.fetch(
        url,
        typeof headers === 'function' ? headers(this.state) : headers
      )
      const {predictions = []} = (await response.json()).json
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
      style,
      className,
      icon,
      height,
      width,
      iconProps,
      renderLoading,
      renderEmpty,
      renderPrediction,
      renderControls
    } = this.props
    const {focused, loading, value, error, predictions} = this.state
    return (
      <Dropdown
        focused={focused}
        icon={icon}
        height={height}
        width={width}
        style={style}
        className={className}
        iconProps={iconProps}
        label={
          <Row mr="-10px" flex={1} justifyContent="center" alignItems="center">
            <Col flex={1}>
              <Input
                ref={this.inputRef}
                height={height}
                autoComplete="new-password"
                value={value}
                onChange={this.changeText}
              />
            </Col>
            {renderControls && renderControls(this.state)}
          </Row>
        }
        onFocus={this.focus}
        onBlur={this.blur}
        onChange={this.selectPlace}
      >
        {error && (
          <View m="5px 15px 10px">
            <Text inline color="red" fontSize="small" textAlign="center">
              {error.message}
            </Text>
          </View>
        )}
        {loading && !predictions.length ? (
          renderLoading(this.state)
        ) : !predictions.length ? (
          <View m="10px 15px">{renderEmpty(this.state)}</View>
        ) : (
          predictions.map(renderPrediction)
        )}
      </Dropdown>
    )
  }
}
