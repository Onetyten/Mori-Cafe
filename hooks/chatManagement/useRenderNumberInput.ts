import { setFood } from "@/store/currentFoodSlice";
import { AddMessage, NewMessage } from "@/store/messageListSlice";
import { messageListType } from "@/types/messageTypes";
import { useCallback } from "react";
import { useDispatch } from "react-redux";



export default function useRenderNumberInput (setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>,loading:boolean) {

    const dispatch = useDispatch()
    const delay = (ms:number) => new Promise(resolve=>setTimeout(resolve,ms))
    
    const triggerNumberInput = useCallback(async (message:messageListType)=>{
        if (!message || message.type !== "numberCountTrigger") return
        if (loading) return console.log("loading")
        setLoading(true)
        setShowOptions(false)

        const newPick:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[`I’ll have the ${message.food.name}`]}
        dispatch(setFood(message.food))
        dispatch(AddMessage(newPick))

        await delay(300)
        const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Great choice! How many ${message.food.name} orders should I add?`]}
        dispatch(AddMessage(newMessage))

        await delay(300)
        const newInput:NewMessage = {type:"numberInput",next:()=>{}, food:message.food}
        dispatch(AddMessage(newInput))

    },[dispatch, loading, setLoading, setShowOptions])


    const renderNumberInput = useCallback(async (message:messageListType)=>{
        if (!message || message.type !== "numberInput") return
    
        if (loading) return console.log("loading")
        setLoading(true)
        setShowOptions(false)

    },[loading, setLoading, setShowOptions])
        

    

    return {renderNumberInput,triggerNumberInput}
}