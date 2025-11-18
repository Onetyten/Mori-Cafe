import { AddMessage } from "@/store/messageListSlice"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import api from "../../utils/api"
import type { RootState } from "../../utils/store"
import BotImage from "./chat Bubble/BotImage"
import BotLoader from "./chat Bubble/BotLoader"

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
    const dispatch = useDispatch()
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
                    return  setFeedack(`Couldn't add ${message.content[0]} to cart, please try again`)
                }
            }
            catch (error) {
                console.error(error)
                setFeedack(`Couldn't add ${message.content[0]} to cart, please try again`)
            }
            finally{
                isAdding.current = false
                message.next()
                const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[feedBack]}
                dispatch(AddMessage(newMessage))
                setAdded(true)
            }
        }
        addToCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if (added===true){
        return null
    }

  return (
    <View style={{width:"100%"}}>
        <View style={{gap:4, alignItems:"flex-start",maxWidth:"75%",flexDirection:"row"}}>
            <BotImage/>
            <BotLoader/>
        </View>
    </View>
  )
}
