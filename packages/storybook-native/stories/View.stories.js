import React from 'react'

import {storiesOf} from '@storybook/react-native'

import {View, Row, Col, Text} from '@emcasa/ui-native'

const story = storiesOf('View', module)

story.add('basic', () => (
  <View p={4}>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Text>
  </View>
))

story.add('elevations', () => (
  <Row flexWrap="wrap">
    {[...Array(24)].map((_, i) => (
      <Col key={i} p={2} width={1 / 3}>
        <View elevation={i} bg="lightGrey" pt={10} pb={10}>
          <Text size="large" textAlign="center" fontWeight="bold">
            {i}
          </Text>
        </View>
      </Col>
    ))}
  </Row>
))
