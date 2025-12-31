import { AddMessage, NewMessage } from '@/store/messageListSlice'
import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setFood } from '../store/currentFoodSlice'
import type { FoodType } from '../types/type'



export default function useOptionCount(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>,loading:boolean) {
    const dispatch = useDispatch()
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])
    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, []);

    const optionCount = useCallback((food:FoodType)=>{
        if (loading) return console.log("something is loading")
        setLoading(true)
        setShowOptions(false)
        const newPick:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[`I’ll have the ${food.name}`]}
        dispatch(setFood(food))
        dispatch(AddMessage(newPick))
        timers.current.push(setTimeout(()=>{
            setShowOptions(false)
            const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Great choice! How many ${food.name} orders should I add?`]}
            dispatch(AddMessage(newMessage))
        },1000))

        timers.current.push(setTimeout(()=>{
            const newInput:NewMessage = {type:"numberInput",food}
            dispatch(AddMessage(newInput))
        },2000))
    },[dispatch, loading, setLoading, setShowOptions])

    return optionCount
}
