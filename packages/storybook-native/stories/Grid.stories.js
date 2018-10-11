import React from 'react'
import {View} from 'react-native'

import {storiesOf} from '@storybook/react-native'

import {Row, Col, Text} from '@emcasa/ui-native'

const story = storiesOf('Grid', module)

const colStyle = {
  borderColor: 'gray',
  borderWidth: 0.5,
  paddingVertical: 5
}

story.add('basic', () => (
  <View style={{flexDirection: 'column'}}>
    <Col style={colStyle}>
      <Text textAlign="center">Full width column (12/12)</Text>
    </Col>
    {[...Array(11)].map((_, i) => (
      <Row key={i}>
        <Col width={(i + 1) / 12} style={colStyle}>
          <Text textAlign="center">{i + 1}</Text>
        </Col>
        <Col width={1 - (i + 1) / 12} style={colStyle}>
          <Text textAlign="center">{12 - i - 1}</Text>
        </Col>
      </Row>
    ))}
  </View>
))
