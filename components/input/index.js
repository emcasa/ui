import React from 'react'
import Input from './styles'
import View from '../view'
import Text from '../text'

export default (props) => {
  return (
    <View>
      {props.label && <Text>{props.label}</Text>}
      <Input {...props} />
    </View>
  )
}
