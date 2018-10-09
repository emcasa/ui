import React from 'react'
import {View} from 'react-native'

import {storiesOf} from '@storybook/react-native'

import {Row, Col} from '@emcasa/ui-native'

const story = storiesOf('Grid', module)

story.add('simple', () => (
  <View style={{flexDirection: 'column'}}>
    <Col>Full width column (12/12)</Col>
    <Row>
      <Col width={1 / 12}>1</Col>
      <Col width={11 / 12}>11</Col>
    </Row>
    <Row>
      <Col width={2 / 12}>2</Col>
      <Col width={10 / 12}>10</Col>
    </Row>
    <Row>
      <Col width={3 / 12}>3</Col>
      <Col width={9 / 12}>9</Col>
    </Row>
    <Row>
      <Col width={4 / 12}>4</Col>
      <Col width={8 / 12}>8</Col>
    </Row>
    <Row>
      <Col width={5 / 12}>5</Col>
      <Col width={7 / 12}>7</Col>
    </Row>
    <Row>
      <Col width={6 / 12}>6</Col>
      <Col width={6 / 12}>6</Col>
    </Row>
    <Row>
      <Col width={7 / 12}>7</Col>
      <Col width={5 / 12}>5</Col>
    </Row>
    <Row>
      <Col width={8 / 12}>8</Col>
      <Col width={4 / 12}>4</Col>
    </Row>
    <Row>
      <Col width={9 / 12}>9</Col>
      <Col width={3 / 12}>3</Col>
    </Row>
    <Row>
      <Col width={10 / 12}>10</Col>
      <Col width={2 / 12}>2</Col>
    </Row>
    <Row>
      <Col width={11 / 12}>11</Col>
      <Col width={1 / 12}>1</Col>
    </Row>
  </View>
))
