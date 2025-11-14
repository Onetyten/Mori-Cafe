import { View, Image } from 'react-native'
import React from 'react'
import { chatStyles } from '@/styles/chatStyle'

const BotImage = () => {
  return (
    <View style={chatStyles.botImageContainer}>
        <Image source={require("@/assets/images/logo.gif")} style={{width:30,height:30}} alt="" />
    </View>
  )
}

export default BotImage