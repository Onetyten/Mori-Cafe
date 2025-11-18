import { chatStyles } from "@/styles/chatStyle"
import { GlobalStyle } from "@/styles/global"
import { useEffect, useRef, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"

interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:string[]
    }
}

export default function ChatMessage (props:propType) {
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
                },300)
            }
        }
        loadNextMessage()
        

        return ()=>{
            isCancelled = true
        }
    },[message, message.content])


  return (
        <View style={{width:"100%",alignItems:"flex-end",gap:8}}>
            <View style={chatStyles.chatMessageView}>
                {displayedMessage.map((item,index)=>{
                    return(
                        <View key={index} style={chatStyles.chatBubbleContainer}>
                            <Text style={[GlobalStyle.Outfit_Regular_body,chatStyles.chatBubble,index === 0&&chatStyles.firstChatBubble]} >
                                {item}
                            </Text>
                        </View>
                    )
                })}
                {isTyping&&(
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


