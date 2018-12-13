import React, {PureComponent} from 'react'
import {storiesOf} from '@storybook/react-native'
import {action} from '@storybook/addon-actions'

import {View, Row, Slider, Text} from '@emcasa/ui-native'

const story = storiesOf('Slider', module)

class ControlledSlider extends PureComponent {
  state = {value: {}}

  constructor(props){
    super(props)
    this.state.value=props.initialValue
  }

  onChange = (value) => this.setState({value})

  render() {
    const {children, ...props} = this.props
    return (
      <Slider onChange={this.onChange} {...props}>
        {children(this.state)}
      </Slider>
    )
  }
}

const MarkerLabel = ({children}) => (
  <Row
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
          trackProps={{bg: 'blue', height: 4}}
        />
      </Slider>
    </View>
  </View>
))

story.add('marker labels', () => (
  <View flexDirection="column">
    <ControlledSlider range={[0, 100]} initialValue={[0, 100]}>
      {({value}) => [
        <Slider.Marker key={0} label={<MarkerLabel>{value[0].toFixed(2)}</MarkerLabel>} />,
        <Slider.Marker key={1} label={<MarkerLabel>{value[1].toFixed(2)}</MarkerLabel>} />
      ]}
    </ControlledSlider>
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
