import React, {PureComponent} from 'react'
import {storiesOf} from '@storybook/react-native'
import {action} from '@storybook/addon-actions'

import {View, Row, Slider, Text} from '@emcasa/ui-native'

const story = storiesOf('Slider', module)

const MarkerLabel = ({children}) => (
  <Row
    bg="white"
    width={60}
    height={30}
    justifyContent="center"
    alignItems="center"
    style={{
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#f50057',
      marginBottom: 5,
      transform: [{translateX: -30}]
    }}
  >
    <Text fontSize="small" color="pink">
      {children}
    </Text>
  </Row>
)

story.add('basic', () => (
  <View flexDirection="column">
    <Slider
      onChange={action('slider changed')}
      range={[0, 1]}
      initialValue={{
        min: 0,
        max: 1
      }}
    >
      <Slider.Marker name="min" />
      <Slider.Marker name="max" />
    </Slider>
  </View>
))

story.add('track and marker styles', () => (
  <View flexDirection="column">
    <View mb="25px">
      <Slider
        onChange={action('slider changed')}
        range={[0, 1]}
        initialValue={1 / 2}
        trackProps={{bg: 'lightGrey'}}
      >
        <Slider.Marker trackProps={{height: 4, bg: 'pink'}} />
      </Slider>
    </View>
    <View mb="25px">
      <Slider
        onChange={action('slider changed')}
        range={[0, 1]}
        initialValue={[1 / 4, 3 / 4]}
        trackProps={{bg: 'lightGrey'}}
      >
        <View
          bg="pink"
          width={25}
          height={25}
          borderRadius={5}
          trackProps={{bg: 'pink'}}
        />
        <View
          bg="blue"
          width={25}
          height={25}
          borderRadius={5}
          trackProps={{bg: 'blue'}}
        />
      </Slider>
    </View>
  </View>
))

story.add('marker labels', () => (
  <View flexDirection="column">
    <Slider range={[0, 100]} initialValue={[0, 100]}>
      <Slider.Marker
        renderLabel={({value}) => <MarkerLabel>{value.toFixed(2)}</MarkerLabel>}
      />
      <Slider.Marker
        renderLabel={({value}) => <MarkerLabel>{value.toFixed(2)}</MarkerLabel>}
      />
    </Slider>
  </View>
))

story.add('multiple markers', () => (
  <View flexDirection="column">
    <View mb="25px">
      <Slider onChange={action('slider changed')} range={[0, 1]}>
        <Slider.Marker />
      </Slider>
    </View>
    <View mb="25px">
      <Slider
        onChange={action('slider changed')}
        range={[0, 1]}
        initialValue={[0, 1]}
      >
        <Slider.Marker />
        <Slider.Marker />
      </Slider>
    </View>
    <View mb="25px">
      <Slider
        onChange={action('slider changed')}
        range={[0, 1]}
        initialValue={[0, 0.5, 1]}
      >
        <Slider.Marker />
        <Slider.Marker />
        <Slider.Marker />
      </Slider>
    </View>
  </View>
))
