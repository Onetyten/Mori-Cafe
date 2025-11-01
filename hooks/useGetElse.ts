import React from 'react'
import type {messageListType} from "../types/type"

export default function useGetElse(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getCategory: (food: string) => void) {

    const getSomethingElseMessage = (message:string)=>{
        setShowOptions(false)
        const  newMessage = {type:"message",next:()=>{}, sender:"user",content:[message]}
        setMessageList((prev)=>[...prev, newMessage])
        const newQuestion = {type:"message",next:()=>{}, sender:"bot",content:[`What would you like`]}
        setTimeout(()=>{
            setMessageList((prev)=>[...prev, newQuestion])
        },500)
        setOptions([{name:'Coffee', onClick:()=>getCategory('coffee')},{name:'Drink',onClick:()=>getCategory('drink')},{name:'Snacks',onClick:()=>getCategory('snack')}])
        setTimeout(()=>{
            setShowOptions(true)
        },1000)
    }
    return getSomethingElseMessage
    
}
