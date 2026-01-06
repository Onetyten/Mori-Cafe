import { AddMessage, NewMessage } from "@/store/messageListSlice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";


export default function useProceedPayment(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>) {
    const dispatch = useDispatch()
    const delay = (ms:number)=> new Promise(resolve=>setTimeout(resolve,ms))

    const ProceedToPayment = useCallback(async()=>{
        setShowOptions(false)
        const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[`Proceed to payment`]}
        dispatch(AddMessage(newMessage))
        await delay(500)
        const newResponse:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Creating your order`]}
        dispatch(AddMessage(newResponse))
        const orderMessage:NewMessage = {type:"orderFeedback",next:()=>{}}
        dispatch(AddMessage(orderMessage))
    },[dispatch, setShowOptions])
    return ProceedToPayment
}
