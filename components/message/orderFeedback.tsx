 
import { AddMessage } from "@/store/messageListSlice"
import api from "@/utils/api"
import { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { usePaystack } from "react-native-paystack-webview"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../utils/store"
import BotImage from "./chat Bubble/BotImage"
import BotLoader from "./chat Bubble/BotLoader"

interface propTypes{
    setOptions: React.Dispatch<React.SetStateAction<{
        name: string;
        onClick: () => void;
    }[]>>,
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
    getSomethingElseMessage: (message: string) => void
}

export default function OrderFeedback(props:propTypes) {
    const {setOptions,setShowOptions,getSomethingElseMessage} = props
    const dispatch = useDispatch()
    const order = useSelector((state:RootState)=>state.newOrder.newOrder)
    const {popup} = usePaystack()

    const [orderCreated,setOrderCreated] = useState(false)

    const deleteOrder = async(id:string)=>{
        await api.delete(`/order/delete/${id}`)
    }

    const endPaymentProcess = async(message:string)=>{
        const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[message]}
        dispatch(AddMessage(newMessage)) 
        setOptions([{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
        setShowOptions(true)   
        return
    }

    useEffect(()=>{
        async function createOrder() {
            try {
                const response = await api.post('/order/create?isMobile=true',order)
                const data = response.data.data
                const payNow = () => popup.checkout({
                    email: data.email,
                    amount: data.amount,
                    onSuccess:async (res)=>{
                        const reference = res.reference
                        if (!reference) {
                            return endPaymentProcess("Unable to retrieve payment reference")
                        }
                        try {
                            await api.post('/order/verify',{orderId:data.orderId, reference})
                            endPaymentProcess(`A payment of ₦${data.amount} was successfully verified.`)
                        }
                        catch (error) {
                            if (isAxiosError(error)){
                                endPaymentProcess(`Error while verifying payment, ${error.response?.data.message}`)
                            }
                            endPaymentProcess("Error while verifying payment")
                        }
                    },
                    
                    onCancel: async () =>{
                        await deleteOrder(data.orderId)
                        endPaymentProcess("Order cancelled")
                    },
                    onError: async (err) => {
                        await deleteOrder(data.orderId)
                        endPaymentProcess("Error during payment")
                    }
                })
                setTimeout(() => {
                    payNow();
                }, 300);
            }

            catch (error) {
                if (isAxiosError(error)){
                    endPaymentProcess(error.response?.data.message)
                }
                else{
                    endPaymentProcess("Internal server error")
                }
            }
            finally{
                setOrderCreated(true)

            }
        }
        createOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
 
    if (orderCreated) return null

  return (
    <View style={{flexDirection:"row",gap:8,alignItems:"flex-start"}}>
        <BotImage sender="bot"/>
        <BotLoader />
    </View>
  )
}