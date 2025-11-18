import { chatStyles } from '@/styles/chatStyle'
import { memo, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import BotChatBubble from "./chat Bubble/BotChatBubble"
import BotImage from './chat Bubble/BotImage'
import BotLoader from './chat Bubble/BotLoader'

interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:string[]
    }
}

const BotMessage = memo(
    function BotMessage(props:propType) {
    const {message} = props
    const [displayedMessage,setDisplayedMessage] = useState<string[]>([])
    const [isTyping,setIsTyping] = useState(true)
    const indexRef = useRef(0)

    useEffect(()=>{
        indexRef.current = -1
        let isCancelled = false
        function loadNextMessage(){
            if (isCancelled) return
            if (indexRef.current < message.content.length-1){
                setIsTyping(true)
                setTimeout(()=>{
                    if (isCancelled) return
                    setIsTyping(false)
                    setDisplayedMessage((prev) => [...prev, message.content[indexRef.current]]);
                    indexRef.current++;
                    if (indexRef.current<message.content.length-1){
                        setTimeout(loadNextMessage,200)
                    }
                    else{
                        if (message.next) message.next()
                    }
                },200)
            }
        }
        loadNextMessage()
        return ()=>{
            isCancelled = true
        }
    },[message, message.content])
    
    return (
        <View style={{width:"100%",alignItems:"flex-start"}}>
            <View style={{flexDirection:"row",gap:8,alignItems:"flex-start"}}>
                <BotImage/>
                <View style={chatStyles.botMessageView}>
                    {displayedMessage.map((item,index)=>{
                        return(
                            <View key={index} style={chatStyles.botBubbleContainer}>
                                <BotChatBubble message={item} index ={index}/>
                            </View>
                        )
                    })}
                    {isTyping&&(
                        <BotLoader />
                    )}
                </View>
            </View>
        </View>
    )
}) 

export default BotMessage