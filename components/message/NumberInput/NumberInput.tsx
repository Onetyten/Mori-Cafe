
import { AddMessage, NewMessage, updateMessage } from '@/store/messageListSlice'
import { chatStyles } from '@/styles/chatStyle'
import { GlobalStyle } from '@/styles/global'
import { messageListType } from '@/types/messageTypes'
import { toWords } from 'number-to-words'
import { memo } from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { styles } from "./style"


interface propType{
    message:messageListType
}

const NumberInput = memo( function NumberInput(props:propType) {
  const {message} = props
  const dispatch = useDispatch()
  if (message.type !== "numberInput") return null
  


  const handleConfirm = async ()=> {
    if (message.value < 1) {
      dispatch(updateMessage({id:message.id,update:{error:"Minimum of 1 item required."}}))
      return
    }
    if (message.value > 10) {
      dispatch(updateMessage({id:message.id,update:{error:"Maximum of 10 items allowed."}}))
      return
    }
    dispatch(updateMessage({id:message.id,update:{error:"",confirmed:true,isTyping:false}})) 
    const confirmToCart:NewMessage = {type:"confirmToCart", value: message.value}
    dispatch(AddMessage(confirmToCart))
  }

  if (message.confirmed === false){
    return(
        <View style={styles.inputParent}>
          <View style={styles.inputContainer}>
            <TextInput 
              value={message.value>0?String(message.value):""}
              onChangeText={(text) => {
                const n = parseInt(text, 10);
                dispatch(updateMessage({id:message.id,update:{value: Number.isNaN(n) ? 0 : n ,error:""}}))
              }}
              keyboardType="numeric"
              style={[{ width: 40},styles.button,styles.text,GlobalStyle.Outfit_Regular_body]} />

            <TouchableOpacity onPress={handleConfirm} style={styles.button} >
                <Text style={[GlobalStyle.Outfit_Regular_body,styles.text]} >Confirm</Text>
            </TouchableOpacity>
            
          </View>
          {message.error.length>0 && <Text style={[styles.errorText,GlobalStyle.Outfit_Regular_small]}>{message.error}</Text> }
          
        </View>
    )
  }

  return (
      <View style={{width:"100%",alignItems:"flex-end",gap:8}}>
          {!message.isTyping?
          (<View style={chatStyles.chatBubbleContainer}>
              <Text style={[GlobalStyle.Outfit_Regular_body,chatStyles.chatBubble,chatStyles.firstChatBubble,chatStyles.oneWord ]} >
                  {toWords(message.value)}
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
})




export default NumberInput