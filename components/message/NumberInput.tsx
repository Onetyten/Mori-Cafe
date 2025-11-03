
import { chatStyles } from '@/styles/chatStyle'
import { toWords } from 'number-to-words'
import { useEffect, useState } from 'react'
import { ActivityIndicator, TextInput, TouchableOpacity, View } from 'react-native'
import type { FoodType } from '../../types/type'


interface propType{
    message:{
        type:string,
        sender:string,
        next?:()=>void, 
        content:FoodType[]
    },
    confirm:(value:number,food:FoodType)=>void
}

export default function NumberInput(props:propType) {
  const {confirm,message} = props 
  const [value,setValue] = useState(1)
  const [confirmed,setConfirmed] = useState(false)
  const [isTyping,setIsTyping] = useState(true)

const handleChange = (text: string) => {
    const val = parseInt(text);
    if (isNaN(val)) setValue(1);
    else if (val > 10) setValue(10);
    else if (val < 1) setValue(1);
    else setValue(val);
  };

  useEffect(()=>{
    setIsTyping(true)
    setTimeout(()=>{
      setIsTyping(false)
    },1000)
  },[confirmed])

  if (!confirmed){
    return(
        <View className="w-full justify-end flex">
          <View  className="flex gap-2 max-w-8/12 justify-end">
        <TextInput
            value={value}
            onChangeText={handleChange}
            keyboardType="numeric"
            style={{
                padding: 8,
                borderWidth: 1,
                width: 40,
                borderRadius: 4,
                textAlign: "center",
            }}
            />
            <TouchableOpacity onPress={()=>{
                confirm(value,message.content[0])
                setConfirmed(true)
              }}
              className="p-2 border rounded-sm cursor-pointer hover:bg-secondary-300/10">
                  Confirm
            </TouchableOpacity>
          </View>
        </View>
    )
  }


  return (
      <View className='flex w-full flex-col gap-0.5 justify-end'>
          {!isTyping?
          (<View className=" flex justify-end items-center text-primary ">
              <p className='bg-secondary-200 text-white rounded-tr-none sm:text-sm text-xs p-2.5 px-4 sm:px-6 rounded-2xl capitalize' >
                  {toWords(value)}
              </p>
          </View>):(
            <View style={chatStyles.chatBubbleLoaderContainer}>
                <View style={chatStyles.chatBubbleLoader} >
                    <ActivityIndicator size="small" color='#e9d5ca'/>   
                </View>
            </View>
          )}
      </View>
  )
}