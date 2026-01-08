import { chatStyles } from '@/styles/chatStyle'
import { messageListType } from '@/types/messageTypes'
import { memo } from 'react'
import { View } from 'react-native'
import BotChatBubble from "./chat Bubble/BotChatBubble"
import BotImage from './chat Bubble/BotImage'
import BotLoader from './chat Bubble/BotLoader'

interface propType{
    message:messageListType
}

const BotMessage = memo(
    function BotMessage(props:propType) {
    const {message} = props;

    if (message.type !== "message" || message.displayedText === undefined) return
    
    return (
        <View style={{width:"100%",alignItems:"flex-start"}}>
            <View style={{flexDirection:"row",gap:8,alignItems:"flex-start"}}>
                <BotImage sender = {message.sender}/>
                
                <View style={chatStyles.botMessageView}>
                        {message.displayedText.length>0 && (
                        message.displayedText.map((item:string,index:number)=>{
                            return(
                                <View key={index} style={chatStyles.botBubbleContainer}>
                                    <BotChatBubble sender = {message.sender} message={item} index ={index}/>
                                </View>
                            )
                        })
                    )}

                    {message.isTyping&&(
                        <BotLoader />
                    )}
                </View>
            </View>
        </View>
    )
}) 

export default BotMessage