import React, {PureComponent} from 'react'
import MultiMarker from '../MultiMarker'
import Pagination from './Pagination'

export default class PaginatedMultiMarker extends PureComponent {
  static defaultProps = {
    color: 'pink',
    getMarkerProps: () => ({})
  }

  state = {
    currentIndex: 0
  }

  static getDerivedStateFromProps(props, state) {
    return {
      currentIndex: !isNaN(props.currentIndex)
        ? props.currentIndex
        : state.currentIndex
    }
  }

  onChangePage = (point, index) =>
    this.setState({currentIndex: index}, () => {
      if (this.props.onChangePage) this.props.onChangePage(point, index)
    })

  getMarkerProps = (point, index) => {
    const props = this.props.getMarkerProps(point, index)
    return {
      ...props,
      style: Object.assign(
        this.state.currentIndex === index ? {} : {display: 'none'},
        props.style
      )
    }
  }

  render() {
    const {points} = this.props
    const {currentIndex} = this.state
    return (
      <MultiMarker
        bg="white"
        {...this.props}
        getMarkerProps={this.getMarkerProps}
      >
        <Pagination
          currentIndex={currentIndex}
          points={points}
          onChange={this.onChangePage}
          color={this.props.color}
        />
      </MultiMarker>
    )
  }
}
