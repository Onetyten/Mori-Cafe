import { chatStyles } from "@/styles/chatStyle"
import { GlobalStyle } from "@/styles/global"
import { messageListType } from "@/types/type"
import { memo } from "react"
import { ActivityIndicator, Text, View } from "react-native"

interface propType{
    message:messageListType,
}

const ChatMessage = memo(
 function ChatMessage (props:propType) {
    const {message} = props
    if (message.type !== "message" || message.displayedText === undefined) return

  return (
        <View style={{width:"100%",alignItems:"flex-end",gap:8}}>
            <View style={chatStyles.chatMessageView}>
                {message.displayedText.map((item,index)=>{
                    return (
                        <View key={index} style={chatStyles.chatBubbleContainer}>
                            <Text style={[GlobalStyle.Outfit_Regular_body,chatStyles.chatBubble,index === 0&&chatStyles.firstChatBubble]} >
                                {item}
                            </Text>
                        </View>
                    )
                })}
                {message.isTyping&&(
                    <View style={chatStyles.chatBubbleLoaderContainer}>
                        <View style={chatStyles.chatBubbleLoader} >
                            <ActivityIndicator size="small" color='#e9d5ca'/>   
                        </View>
                    </View>
                )}
            </View>
        </View>
  )
}
)

export default ChatMessage
