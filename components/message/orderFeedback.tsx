/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../utils/store"
import api from "../../utils/api"
import { isAxiosError } from "axios"
import { addPendingOrder } from "../../store/pendingOrderSlice"
import { ActivityIndicator, Text, View } from "react-native"
import BotImage from "./chat Bubble/BotImage"
import { usePaystack } from "react-native-paystack-webview"




export default function OrderFeedback() {
    const dispatch = useDispatch()
    const order = useSelector((state:RootState)=>state.newOrder.newOrder)
    const [added,setAdded] = useState(false)
    const [feedBack,setFeedback] = useState(`Pay`)

    useEffect(()=>{
        async function createOrder() {
            try {
                const response = await api.post('/order/create',order)
                if (response.data.success===false){
                    return
                }
                setFeedback("You will be redirected to your payment portal shortly")
                const data = response.data.data
                dispatch(addPendingOrder(data.reference))
                setTimeout(()=>{
                    window.location.href = data.authorization_url
                },1000)
            }
            catch (error) {
                if (isAxiosError(error)){
                    setFeedback(error.response?.data.message)
                }
                else{
                    setFeedback("Internal server error")
                }
                
            }
            finally{
                setAdded(true)
            }
        }
        createOrder()
    },[])

  return (
    <View className="max-w-8/12 flex gap-2 items-start">
        <BotImage sender="bot"/>
        {added?(
            <View className=" flex justify-start items-center text-primary ">
                <Text className='bg-primary text-background rounded-2xl rounded-tl-none sm:text-sm text-xs p-2.5 px-4 sm:px-6' >
                    {feedBack}
                </Text>
            </View>
        ):
        (
            <View className=" flex justify-start items-center">
                <View className='bg-primary text-background p-2.5 px-6 rounded-2xl text-sm' >
                    <ActivityIndicator size="small"/>
                </View>
            </View>
        )}

    </View>
  )
}