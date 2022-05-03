import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const Loading = () => {
  return (
    <View style= {{flex:1, alignItems: 'center', justifyContent: 'center',}}>
      <ActivityIndicator size='large' color='#00f' />
    </View>
  )
}

export default Loading