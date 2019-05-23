import React from 'react'
import styled from 'styled-components'
import Icon from '@emcasa/ui-dom/components/Icon'
import Text from '@emcasa/ui-dom/components/Text'

const Container = styled.div`
  position: relative;
  with: 55px;
  height: 55px;
  margin-top: -40px;
  margin-left: -22.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const Label = styled(Text).attrs({inline: true})`
  position: absolute;
  display: block;
  width: 55px;
  height: 1em;
  bottom: 11px;
  text-align: center;
  color: white;
`

export default function PawMarker({points, onClick}) {
  return (
    <Container onClick={onClick}>
      <Label>{points.length}</Label>
      <Icon color="pink" name="paw" size={50} stroke="white" strokeWidth={20} />
    </Container>
  )
}
