import { AddMessage } from "@/store/messageListSlice"
import { useDispatch } from "react-redux"





export default function useProceedPayment(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>) {
    const dispatch = useDispatch()
    function ProceedToPayment(){
        setShowOptions(false)
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Proceed to payment`]}
        dispatch(AddMessage(newMessage))
        setTimeout(()=>{
            const newResponse = {type:"message",next:()=>{}, sender:"bot",content:[`Creating your order`]}
            dispatch(AddMessage(newResponse))
            const orderMessage = {type:"order-feedback",next:()=>{}, sender:"bot",content:[]}
            dispatch(AddMessage(orderMessage))
        },1000)
    }
    return ProceedToPayment

}
