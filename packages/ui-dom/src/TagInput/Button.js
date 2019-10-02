import React from 'react'
import styled from 'styled-components'
import {themeGet} from '@styled-system/theme-get'
import {space} from 'styled-system'
import {buttonHeight} from '@emcasa/ui/lib/styles'
import Col from '../Col'
import Button from '../Button'
import Text from '../Text'
import Icon from '../Icon'

export const tagVerticalMargin = 5

export const tagHeight = (props) => ({
  height: parseInt(buttonHeight(props).height) - tagVerticalMargin * 2
})

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
  height: ${(props) => tagHeight(props).height - 1}px;
  line-height: ${(props) => tagHeight(props).height - 1}px;
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
      type="button"
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
          height={props.height}
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
  margin: 0 0 ${tagVerticalMargin}px ${themeGet('space.2')}px;
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
  ${tagHeight};
  ${space};
`
