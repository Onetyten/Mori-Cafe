import { chatStyles } from "@/styles/chatStyle"
import { GlobalStyle } from "@/styles/global"
import { Image } from "expo-image"
import { useEffect, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { useSelector } from "react-redux"
import api from "../../utils/api"
import type { RootState } from "../../utils/store"

interface propType{
    message:{
        type:string,
        sender:string,
        next:()=>void, 
        content:string[]
    },
    isAdding: React.RefObject<boolean>
}

export default function CartFeedBack(props:propType) {
    const {message,isAdding} = props
    const [added,setAdded] = useState(false)
    const food = useSelector((state:RootState)=>state.cart.cart)
    const [feedBack,setFeedack] = useState(`Added ${message.content[0]} to tab, would you like anything else`)

    useEffect(()=>{
        if (!food) return
        
        async function addToCart() {
            try {
                if (!message.next) return
                const response = await api.post('/order/cart/add',food)
                if (response.data.success === false){
                     setFeedack(`Couldn't add ${message.content[0]} to cart, please try again`)
                }
                // const item = response.data.data
            }
            catch (error) {
                console.error(error)
                setFeedack(`Couldn't add ${message.content[0]} to cart, please try again`)
            }
            finally{
                isAdding.current = false
                message.next()
                setAdded(true)
            }
        }
        addToCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <View style={{flexDirection:"row",gap:8,alignItems:"flex-start"}}>
        <View style={chatStyles.botImageContainer}>
            <Image source={require("@/assets/images/logo.gif")} style={{width:30,height:30}} alt="" />
        </View>
        {added?(
            <View style={[chatStyles.botBubbleContainer,{maxWidth:"80%"}]}>
                <Text style={[GlobalStyle.Outfit_Regular_body,chatStyles.botchatBubble,chatStyles.firstBotBubble]} >
                    {feedBack}
                </Text>
            </View>
        ):
        (
        <View style={chatStyles.botBubbleContainer}>
            <View style={chatStyles.botBubbleLoader} >
                <ActivityIndicator size="small" color='#e9d5ca'/>  
            </View>
        </View>
        )}
    </View>
  )
}
