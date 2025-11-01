import { Image } from 'expo-image'
import { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { BarIndicator } from 'react-native-indicators'
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
    <View className='w-full items-start'>
        <View className="max-w-8/12 flex flex-row gap-2 items-start">
            <View className='bg-primary rounded-full flex justify-center items-center' style={{width:45,height:45}}>
                <Image source={require("@/assets/images/logo.gif")} style={{width:30,height:30}} alt="" />
            </View>

            <View className='flex gap-1 items-start'>
                {displayedMessage.map((item,index)=>{
                    return(
                        <View key={index} className=" flex justify-start items-center text-primary ">
                            <BotChatBubble message={item} index ={index}/>
                        </View>
                    )
                })}
                {isTyping&&(
                    <View className="justify-start items-center text-primary ">
                        <View className='bg-primary max-h-11 text-background p-2.5 px-6 rounded-2xl text-sm' >
                            <BarIndicator size={15} color='#e9d5ca'/>  
                        </View>
                    </View>
                )}
            </View>
        </View>
    </View>
  )
}


