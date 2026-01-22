import { AddMessage, NewMessage, removeMessage } from "@/store/messageListSlice";
import { messageListType } from "@/types/messageTypes";
import api from "@/utils/api";
import { RootState } from "@/utils/store";
import { isAxiosError } from "axios";
import { useCallback } from "react";
import { usePaystack } from "react-native-paystack-webview";
import { useDispatch, useSelector } from "react-redux";
import useGetElse from "./useGetElse";
import useSubcategory from "./useSubcategory";


export default function useProcessOrder(setLoading:React.Dispatch<React.SetStateAction<boolean>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,addToCart:()=> void,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,isAdding: React.RefObject<boolean>) {

    const dispatch = useDispatch();
    // const delay = (ms:number)=> new Promise(resolve=>setTimeout(resolve,ms))
    const order = useSelector((state:RootState)=>state.newOrder.newOrder)
    const {popup} = usePaystack()
    const {getCategory} = useSubcategory(setOptions,setShowOptions)
    const getSomethingElseMessage = useGetElse(setLoading,setShowOptions,setOptions,getCategory)

    const processOrder = useCallback(async(message:messageListType)=>{
        if (!message || message.type !== "orderFeedback") return

        const deleteOrder = async(id:string)=>{
            await api.delete(`/order/delete/${id}`)
        }

        const endPaymentProcess = async(text:string)=>{
            const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[text]}
            dispatch(AddMessage(newMessage)) 
            setOptions([{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
            setShowOptions(true) 
            dispatch(removeMessage(message.id))  
            return
        }

        try {
            if (order?.items.length===0){
                const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Your order is empty, please order something to continue`]}
                dispatch(AddMessage(newMessage))
                setOptions([{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
                setShowOptions(true)
                return
            }
            const response = await api.post('/order/create?isMobile=true',order)
            const data = response.data.data
            const reference = `ref_moricafe_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
            const payNow = () => popup.checkout({
                email: data.email,
                amount: data.amount,
                reference,
                onSuccess:async (res)=>{
                    const reference = res.reference
                    if (!reference) {
                        return endPaymentProcess("Unable to retrieve payment reference")
                    }
                    try {
                        const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:["Order created, verifying your payment"]}
                        dispatch(AddMessage(newMessage)) 
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
        
    },[dispatch, getSomethingElseMessage, order, popup, setOptions, setShowOptions])

        
    
    return {processOrder}
}
