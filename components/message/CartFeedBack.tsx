import { memo } from "react"
import { View } from "react-native"
import BotImage from "./chat Bubble/BotImage"
import BotLoader from "./chat Bubble/BotLoader"

const CartFeedBack = memo(function CartFeedBack () {

  return (
    <View style={{width:"100%"}}>
        <View style={{gap:4, alignItems:"flex-start",maxWidth:"75%",flexDirection:"row"}}>
            <BotImage sender="bot"/>
            <BotLoader/>
        </View>
    </View>
  )
})

export default CartFeedBack