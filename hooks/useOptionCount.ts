import React from 'react'
import type { FoodType, messageListType } from '../types/type'
import { useDispatch } from 'react-redux'
import { setFood } from '../store/currentFoodSlice'



export default function useOptionCount(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>,loading:boolean,setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>) {
    const dispatch = useDispatch()
    function optionCount(food:FoodType){
        if (loading) return console.log("something is loading")
        setLoading(true)
        setShowOptions(false)
        const newPick = {type:"message",next:()=>{}, sender:"user",content:[`I’ll have the ${food.name}`]}
        dispatch(setFood(food))
        setMessageList((prev)=>[...prev, newPick ])
        setTimeout(()=>{
            setShowOptions(false)
            const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Great choice! How many ${food.name} orders should I add?`]}
            setMessageList((prev)=>[...prev, newMessage ])
        },1000)
        setTimeout(()=>{
            const newInput = {type:"number-input",next:()=>{}, sender:"user",content:[food]}
            setMessageList((prev)=>[...prev, newInput ])
        },1000)
    }

    return optionCount
}
