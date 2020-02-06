import React from 'react'
import {DraggableContent, DraggableContainer, DraggableWrapper} from './styles'

function DraggableCard({children, isDragging, isActive, innerRef, ...props}) {
  return (
    <DraggableWrapper
      ref={innerRef}
      isDragging={isDragging}
      isActive={isActive}
      {...props}
    >
      <DraggableContainer
        isDragging={isDragging}
        isClickable={Boolean(props.onClick)}
      >
        <DraggableContent>{children}</DraggableContent>
      </DraggableContainer>
    </DraggableWrapper>
  )
}

export default React.forwardRef((props, ref) => (
  <DraggableCard {...props} innerRef={ref} />
))
