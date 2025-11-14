import { chatStyles } from '@/styles/chatStyle'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

function BotLoader() {
  return (
    <View style={chatStyles.botBubbleContainer}>
        <View style={chatStyles.botBubbleLoader} >
            <ActivityIndicator size="small" color='#e9d5ca'/>  
        </View>
    </View>
  )
}

export default BotLoader