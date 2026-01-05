import { AddMessage } from "@/store/messageListSlice";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";


export default function useProceedPayment(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>) {
    const dispatch = useDispatch()
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])
    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, []);

    const ProceedToPayment = useCallback(()=>{
        setShowOptions(false)
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Proceed to payment`]}
        dispatch(AddMessage(newMessage))
        timers.current.push(setTimeout(()=>{
            const newResponse = {type:"message",next:()=>{}, sender:"bot",content:[`Creating your order`]}
            dispatch(AddMessage(newResponse))
            const orderMessage = {type:"orderFeedback",next:()=>{}, sender:"bot",content:[]}
            dispatch(AddMessage(orderMessage))
        },1000))
    },[dispatch, setShowOptions])
    return ProceedToPayment
}
