import React from 'react'
import styled from 'styled-components'
import {themeGet} from 'styled-system'
import Col from '../Col'
import Button from '../Button'
import Text from '../Text'
import Icon from '../Icon'

const TAG_HEIGHT = 25

const IconButton = styled(function TagIconButton({
  className,
  onClick,
  ...props
}) {
  return (
    <div className={className} onMouseDown={onClick}>
      <Icon size={10} {...props} />
    </div>
  )
})`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${TAG_HEIGHT - 1}px;
  line-height: ${TAG_HEIGHT - 1}px;
  width: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`

const stopPropagation = (fun) => (e) => {
  e.preventDefault()
  e.stopPropagation()
  fun(e)
}

export default styled(function TagButton({
  children,
  onDelete,
  onSelect,
  ...props
}) {
  delete props.color
  return (
    <Button
      onClick={!onSelect ? undefined : stopPropagation(onSelect)}
      fontSize="small"
      {...props}
    >
      <Col>
        <Text inline fontSize="small" color="inherit">
          {children}
        </Text>
      </Col>
      {onDelete && (
        <IconButton
          name="times"
          size={10}
          color={props.active ? 'white' : 'pink'}
          onClick={stopPropagation(onDelete)}
        />
      )}
    </Button>
  )
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  display: flex;
  height: ${TAG_HEIGHT}px;
  margin: ${({theme}) => (theme.buttonHeight[1] - TAG_HEIGHT) / 2}px
    ${themeGet('space.2')}px;
  margin-right: 0;
  padding: 0 ${themeGet('space.2')}px;
  ${({color, active}) =>
    color && active ? {backgroundColor: color, borderColor: color} : undefined};
  ${({color, selected}) =>
    color && selected ? {color, borderColor: color} : undefined};
  &:hover {
    ${({color, active}) =>
      color && active
        ? {backgroundColor: color, borderColor: color}
        : undefined};
  }
  ${IconButton}:last-of-type {
    margin-left: ${themeGet('space.2')}px;
    margin-right: -${themeGet('space.2')}px;
  }
`
