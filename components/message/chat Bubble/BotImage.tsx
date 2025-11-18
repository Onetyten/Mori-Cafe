import { chatStyles } from '@/styles/chatStyle'
import { colors } from '@/styles/global'
import React from 'react'
import { Image, View } from 'react-native'

const BotImage = ({sender}:{sender:string}) => {
  return (
    <View style={[chatStyles.botImageContainer,sender === "bot-error"?{backgroundColor:colors.danger}:{backgroundColor:colors.primary}]}>
        <Image source={require("@/assets/images/logo.gif")} style={{width:30,height:30}} alt="" />
    </View>
  )
}
export default BotImage