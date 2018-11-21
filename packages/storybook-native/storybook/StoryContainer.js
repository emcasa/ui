import React from 'react'
import {View} from 'react-native'

export default function StoryContainer({story}) {
  return (
    <View
      collapsable={false}
      style={{flex: 1, padding: 20, width: '100%', height: '100%'}}
    >
      {story()}
    </View>
  )
}
