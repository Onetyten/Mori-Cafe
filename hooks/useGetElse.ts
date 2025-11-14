import React from 'react'
import { useDispatch } from 'react-redux';
import { AddMessage } from '@/store/messageListSlice';

export default function useGetElse(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getCategory: (food: string) => void) {
    const dispatch = useDispatch()
    const getSomethingElseMessage = (message:string)=>{
        
        setShowOptions(false)
        const  newMessage = {type:"message",next:()=>{}, sender:"user",content:[message]}
        dispatch(AddMessage(newMessage))
        const newQuestion = {type:"message",next:()=>{}, sender:"bot",content:[`What would you like`]}
        setTimeout(()=>{
            dispatch(AddMessage(newQuestion))
        },500)
        setOptions([{name:'Coffee', onClick:()=>getCategory('coffee')},{name:'Drink',onClick:()=>getCategory('drink')},{name:'Snacks',onClick:()=>getCategory('snack')}])
        setTimeout(()=>{
            setShowOptions(true)
        },1000)
    }
    return getSomethingElseMessage
    
}
