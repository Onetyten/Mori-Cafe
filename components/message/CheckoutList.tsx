
import { messageListType } from "@/types/messageTypes"
import { memo } from "react"
import { View } from "react-native"
import { useSelector } from "react-redux"
import type { RootState } from "../../utils/store"
import BotImage from "./chat Bubble/BotImage"
import BotLoader from "./chat Bubble/BotLoader"
import CheckoutItem from "./options/CheckoutItem"


interface propType{
    message:messageListType
}

const CheckoutList = memo(function CheckoutList(props:propType) {
    const {message} = props
    const cartList = useSelector((state:RootState)=>state.orderList.orderList)
    
    if (message.type !== "checkoutList") return

  return (
    <View style={{width:"100%"}}>
        {message.fetched?(
            <View style={{width:"100%",gap:24}}>
                <View className="w-full flex gap-2 items-start justify-end">     
                    <View className="flex w-full justify-end items-end text-sm text-secondary-100 flex-col gap-2 ">
                        {cartList.filter((item) => item && item.foodId).map((item, index) => (
                            <CheckoutItem message={message} food={item} key={index} />
                        ))}
                    </View>
                </View>
            </View>
        ):
        (
            <View style={{gap:4, alignItems:"flex-start",maxWidth:"75%",flexDirection:"row"}}>
                <BotImage sender="bot"/>
                <BotLoader/>
            </View>
        )}   
    </View>
  )
})

export default CheckoutList