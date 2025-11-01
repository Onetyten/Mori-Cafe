import type { messageListType } from "../types/type"





export default function useProceedPayment(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>) {
    function ProceedToPayment(){
        setShowOptions(false)
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Proceed to payment`]}
        setMessageList((prev)=>[...prev, newMessage ])
        setTimeout(()=>{
            const newResponse = {type:"message",next:()=>{}, sender:"bot",content:[`Creating your order`]}
            setMessageList((prev)=>[...prev, newResponse ])
            const orderMessage = {type:"order-feedback",next:()=>{}, sender:"bot",content:[]}
            setMessageList((prev)=>[...prev, orderMessage ])
        },1000)
    }
    return ProceedToPayment

}
