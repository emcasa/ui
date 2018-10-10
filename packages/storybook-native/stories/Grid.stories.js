import React from 'react'
import {View} from 'react-native'

import {storiesOf} from '@storybook/react-native'

import {Row, Col, Text} from '@emcasa/ui-native'

const story = storiesOf('Grid', module)

story.add('simple', () => (
  <View style={{flexDirection: 'column'}}>
    <Col>
      <Text>Full width column (12/12)</Text>
    </Col>
    {[...Array(11)].map((_, i) => (
      <Row key={i}>
        <Col width={(i + 1) / 12}>
          <Text>{i}</Text>
        </Col>
        <Col width={(12 - i) / 12}>
          <Text>{12 - i}</Text>
        </Col>
      </Row>
    ))}
  </View>
))
