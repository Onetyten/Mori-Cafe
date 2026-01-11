import { chatStyles } from '@/styles/chatStyle'
import { colors } from '@/styles/global'
import React from 'react'
import { Image, View } from 'react-native'

const BotImage = ({sender}:{sender:"bot-error"|"bot" | "user"}) => {
  return (
    <View style={[chatStyles.botImageContainer,sender === "bot-error"?{backgroundColor:colors.danger}:{backgroundColor:colors.primary}]}>
        <Image source={require("@/assets/images/logo-small.webp")} style={{width:25,height:25}} alt="" />
    </View>
  )
}
export default BotImage