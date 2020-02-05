import update from 'immutability-helper'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Image from '../ImageSource'

export default class Images extends PureComponent {
  static propTypes = {
    onChangePosition: PropTypes.func,
    onDeactivate: PropTypes.func,
    onActivate: PropTypes.func
  }

  state = {
    images: undefined
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.images) return {images: props.images}
    return null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.images !== this.props.images) {
      this.setState({images: this.props.images})
    }
  }

  onHover = ({targetIndex}) => this.setState({activeTarget: targetIndex})

  onMove = ({sourceIndex, targetIndex}) => {
    if (typeof targetIndex === 'undefined') {
      this.setState({activeTarget: undefined})
      return
    }
    this.setState(
      ({images}) => ({
        activeTarget: undefined,
        images: update(images, {
          $splice: [[sourceIndex, 1], [targetIndex, 0, images[sourceIndex]]]
        })
      }),
      () => {
        const {onChangePosition} = this.props
        const input = this.state.images.map(({id}, index) => ({
          id,
          position: index
        }))
        if (onChangePosition) onChangePosition(input)
      }
    )
  }

  render() {
    const {onDeactivate, onActivate, onClick} = this.props
    const {images, activeTarget} = this.state
    return images.map((image, index) => (
      <Image
        isActive={index === activeTarget}
        key={image.id}
        index={index}
        image={image}
        onDrop={this.onMove}
        onHover={this.onHover}
        onDeactivate={onDeactivate}
        onActivate={onActivate}
        onClick={onClick}
      />
    ))
  }
}
