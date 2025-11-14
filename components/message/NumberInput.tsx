
import { chatStyles } from '@/styles/chatStyle'
import { colors, GlobalStyle } from '@/styles/global'
import { toWords } from 'number-to-words'
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
  const [errorMessage,setErrorMessage] = useState("")

  const handleConfirm = ()=>{
    if (value < 1) {
      return setErrorMessage("Minimum 1 item required.");
    }
    if (value > 10) {
      return setErrorMessage("Maximum 10 items allowed.");
    }
    setErrorMessage("")
    confirm(value,message.content[0])
    setConfirmed(true)
    
  }

  useEffect(()=>{
    setIsTyping(true)
    setTimeout(()=>{
      setIsTyping(false)
    },1000)
  },[confirmed])


  if (!confirmed){
    return(
        <View style={styles.inputParent}>
          <View style={styles.inputContainer}>
            <TextInput 
              value={value>0?String(value):""}
              onChangeText={text=>setValue(Number(text) || 0)}
              keyboardType="numeric"
              style={[{ width: 40},styles.button,styles.text,GlobalStyle.Outfit_Regular_body]} />

            <TouchableOpacity onPress={handleConfirm} style={styles.button} >
                <Text style={[GlobalStyle.Outfit_Regular_body,styles.text]} >Confirm</Text>
            </TouchableOpacity>
            
          </View>
          {errorMessage.length>0 && <Text style={[styles.errorText,GlobalStyle.Outfit_Regular_small]}>{errorMessage}</Text> }
          
        </View>
    )
  }


  return (
      <View style={{width:"100%",alignItems:"flex-end",gap:8}}>
          {!isTyping?
          (<View style={chatStyles.chatBubbleContainer}>
              <Text style={[GlobalStyle.Outfit_Regular_body,chatStyles.chatBubble,chatStyles.firstChatBubble,chatStyles.oneWord ]} >
                  {toWords(value)}
              </Text>
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


const styles = StyleSheet.create({
  inputParent:{
    width:"100%",
    gap:4,
    alignItems:"flex-end",
  },
  inputContainer:{
    maxWidth:"80%",
    gap:4,
    flexDirection:"row",
    justifyContent:"flex-end"
  },
  confirmText:{
    padding:8,
    borderWidth:1,
    borderRadius:4,
  },
  errorText:{
    color:colors.danger
  },
  button: {
    padding: 8,
    borderWidth: 1,
    textAlign:"center",
    borderColor: colors.primary,
    backgroundColor:colors.background,
    borderRadius: 6,
  },
  text: {
    color: colors.primary,
  
  },

})