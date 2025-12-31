import { AddMessage, NewMessage } from '@/store/messageListSlice'
import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setFood } from '../store/currentFoodSlice'
import type { FoodType } from '../types/type'



export default function useOptionCount(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>,loading:boolean) {
    const dispatch = useDispatch()
   

    const optionCount = useCallback((food:FoodType)=>{
        if (loading) return console.log("something is loading")
        setLoading(true)
        setShowOptions(false)
        const newPick:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[`I’ll have the ${food.name}`]}

        dispatch(setFood(food))
        dispatch(AddMessage(newPick))
        timers.current.push(setTimeout(()=>{
            
        },1000))

        timers.current.push(setTimeout(()=>{
            
        },2000))
    },[dispatch, loading, setLoading, setShowOptions])

    return optionCount
}
