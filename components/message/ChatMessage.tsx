import { useEffect, useRef, useState } from "react"
import { Text, View } from "react-native"
import { BarIndicator } from 'react-native-indicators'


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
        <View className="w-full flex gap-2 items-end">
            <View className='flex max-w-8/12 flex-col gap-1 items-end w-full '>
                {displayedMessage.map((item,index)=>{
                    return(
                        <View key={index} className=" flex justify-end items-center text-primary ">
                            <Text className={`bg-secondary-200 text-white text-xl p-2.5 px-4 sm:px-6 font-outfit-regular rounded-2xl ${index===0?"rounded-tr-none":""}`} >
                                {item}
                            </Text>
                        </View>
                    )
                })}
                {isTyping&&(
                    <View className="justify-start items-center">
                        <View className='bg-secondary-200 max-h-11 text-background p-2.5 px-6 rounded-2xl text-sm' >
                            <BarIndicator size={15} color='#588159'/>  
                        </View>
                    </View>
                )}
            </View>
        </View>
  )
}


