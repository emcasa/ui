import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {DragSource, DropTarget} from 'react-dnd'
import {Image, IconButton, ButtonContainer} from './styles'
import DraggableCard from '../Card'

export const DND_TYPE = 'IMAGE'

const getDnDState = ({sourceIndex, targetIndex}, monitor, component) => {
  // Determine rectangle on screen
  const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

  // Get vertical middle
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

  // Determine mouse position
  const clientOffset = monitor.getClientOffset()

  // Get pixels to the top
  const hoverClientY = clientOffset.y - hoverBoundingRect.top

  // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%

  // Dragging downwards
  if (sourceIndex < targetIndex && hoverClientY < hoverMiddleY) return

  // Dragging upwards
  if (sourceIndex < targetIndex && hoverClientY < hoverMiddleY) return

  return true
}

const imageSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const imageTarget = {
  hover(props, monitor, component) {
    const source = monitor.getItem()
    const dnd = {
      originalSourceIndex: source.index,
      sourceIndex: source.hoverIndex || source.index,
      targetIndex: props.index
    }

    if (
      dnd.sourceIndex === dnd.targetIndex ||
      dnd.originalSourceIndex === dnd.targetIndex
    )
      return
    else if (getDnDState(dnd, monitor, component)) {
      // Time to actually perform the action
      if (props.onHover) props.onHover(dnd)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      source.hoverIndex = dnd.targetIndex
    } else {
      source.hoverIndex = undefined
    }
  },
  drop(props, monitor) {
    const dnd = {
      sourceIndex: monitor.getItem().index,
      targetIndex: monitor.getItem().hoverIndex
    }
    // Time to actually perform the action
    if (props.onDrop) props.onDrop(dnd)
  }
}
const Target = DropTarget(DND_TYPE, imageTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

const Source = DragSource(DND_TYPE, imageSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

class DraggableImage extends Component {
  onActivate = () => {
    const {onActivate} = this.props
    if (onActivate) onActivate(this.props.image.id)
  }

  onDeactivate = () => {
    const {onDeactivate} = this.props
    if (onDeactivate) onDeactivate(this.props.image.id)
  }

  render() {
    const {
      image,
      isDragging,
      isActive,
      gridSize,
      connectDragSource,
      connectDropTarget,
      onClick
    } = this.props
    return (
      <DraggableCard
        isDragging={isDragging}
        isActive={isActive}
        gridSize={gridSize}
        onClick={(e) => !isDragging && onClick(image, e)}
        ref={(instance) => {
          connectDragSource(instance)
          connectDropTarget(instance)
        }}
      >
        <ButtonContainer gridSize={gridSize}>
          <IconButton
            name={image.isActive ? 'times-circle' : 'arrow-circle-up'}
            onClick={image.isActive ? this.onDeactivate : this.onActivate}
          />
        </ButtonContainer>
        <Image image={image} />
      </DraggableCard>
    )
  }
}

export default Target(Source(DraggableImage))
