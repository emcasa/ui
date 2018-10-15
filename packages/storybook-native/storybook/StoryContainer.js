import React from 'react'
import {View} from 'react-native'

export default function StoryContainer({story}) {
  return <View style={{flex: 1, margin: 20}}>{story()}</View>
}
