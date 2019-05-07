import uniqBy from 'lodash/uniqBy'
import {PureComponent} from 'react'

function LatLngBounds(bounds) {
  return new window.google.maps.LatLngBounds(
    new window.google.maps.LatLng(bounds.sw.lat, bounds.sw.lng),
    new window.google.maps.LatLng(bounds.ne.lat, bounds.ne.lng)
  )
}
export default class PlaceSearch extends PureComponent {
  state = {
    active: false,
    places: []
  }

  componentDidUpdate(prevProps, prevState) {
    const {active, bounds, loadedBounds} = this.state
    if (
      active &&
      (prevState.bounds !== bounds || prevState.active !== active) &&
      !(
        loadedBounds &&
        loadedBounds.contains(bounds.sw) &&
        loadedBounds.contains(bounds.ne)
      )
    ) {
      this.updatePlaces()
    }
  }

  updatePlaces() {
    if (!this.maps) return
    const {bounds: boundsLiteral} = this.state
    const bounds = LatLngBounds(boundsLiteral)
    this.setState(
      ({loadedBounds}) => ({
        loadedBounds: loadedBounds ? loadedBounds.union(bounds) : bounds
      }),
      () => {
        this.service.nearbySearch(
          {
            bounds,
            type: [this.props.type]
          },
          (response, status) => {
            if (status != this.maps.places.PlacesServiceStatus.OK) return
            this.setState(({places}) => ({
              places: uniqBy(places.concat(response), 'id')
            }))
          }
        )
      }
    )
  }

  onChange = ({bounds}) => {
    this.setState({bounds})
  }

  onTogglePlaces = () => this.setState({active: !this.state.active})

  onMapLoaded = ({map, maps}) => {
    if (!maps.places) throw new Error('Google places library not found.')
    this.maps = maps
    this.service = new maps.places.PlacesService(map)
  }

  render() {
    return this.props.children({
      ...this.state,
      onTogglePlaces: this.onTogglePlaces,
      onChange: this.onChange,
      onMapLoaded: this.onMapLoaded
    })
  }
}
