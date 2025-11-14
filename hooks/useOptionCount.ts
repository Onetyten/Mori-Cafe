import { AddMessage } from '@/store/messageListSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setFood } from '../store/currentFoodSlice'
import type { FoodType } from '../types/type'



export default function useOptionCount(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>,loading:boolean) {
    const dispatch = useDispatch()
    function optionCount(food:FoodType){
        if (loading) return console.log("something is loading")
        setLoading(true)
        setShowOptions(false)
        const newPick = {type:"message",next:()=>{}, sender:"user",content:[`I’ll have the ${food.name}`]}
        dispatch(setFood(food))
        dispatch(AddMessage(newPick))
        setTimeout(()=>{
            setShowOptions(false)
            const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Great choice! How many ${food.name} orders should I add?`]}
            dispatch(AddMessage(newMessage))
        },1000)
        setTimeout(()=>{
            const newInput = {type:"number-input",next:()=>{}, sender:"user",content:[food]}
            dispatch(AddMessage(newInput))
        },2000)
    }

    return optionCount
}
