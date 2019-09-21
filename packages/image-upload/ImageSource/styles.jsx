import React from 'react'
import styled from 'styled-components'
import Icon from '@emcasa/ui-dom/components/Icon'
import {gridStyle} from '../styles/grid'

export const Image = styled.div`
  background-image: ${({
    image,
    theme: {
      ImageUpload: {getImageUrl}
    }
  }) => `url(${getImageUrl(image)})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  padding-bottom: 64%;
  ${({image}) =>
    !image.isActive && {
      filter: 'grayscale(1)'
    }};
`

export const IconButton = styled(function IconButton({name, ...props}) {
  return (
    <a {...props}>
      <Icon color="white" name={name} />
    </a>
  )
})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
`

export const ButtonContainer = styled.div.attrs((props) => ({
  style: gridStyle('ButtonContainer', props)
}))`
  z-index: 1;
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  top: 0;
  right: 0;
  svg {
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.46));
  }
`
