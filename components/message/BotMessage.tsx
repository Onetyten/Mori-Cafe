import { chatStyles } from '@/styles/chatStyle'
import { Image } from 'expo-image'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import BotChatBubble from "./chat Bubble/BotChatBubble"

interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:string[]
    }
}

export default function BotMessage(props:propType) {
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
                        setTimeout(loadNextMessage,500)
                    }
                    else{
                        if (message.next) message.next()
                        
                    }
                },800)
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
            <View style={chatStyles.botImageContainer}>
                <Image source={require("@/assets/images/logo.gif")} style={{width:30,height:30}} alt="" />
            </View>

            <View style={chatStyles.botMessageView}>
                {displayedMessage.map((item,index)=>{
                    return(
                        <View key={index} style={chatStyles.botBubbleContainer}>
                            <BotChatBubble message={item} index ={index}/>
                        </View>
                    )
                })}
                {isTyping&&(
                    <View style={chatStyles.botBubbleContainer}>
                        <View style={chatStyles.botBubbleLoader} >
                            <ActivityIndicator size="small" color='#e9d5ca'/>  
                        </View>
                    </View>
                )}
            </View>
        </View>
    </View>
  )
}