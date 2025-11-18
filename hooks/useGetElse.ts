import { AddMessage } from '@/store/messageListSlice';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function useGetElse(setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getCategory: (food: string) => void) {
    const dispatch = useDispatch()
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])
    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, []);

    const getSomethingElseMessage = useCallback((message:string)=>{
        setShowOptions(false)
        const  newMessage = {type:"message",next:()=>{}, sender:"user",content:[message]}
        dispatch(AddMessage(newMessage))
        const newQuestion = {type:"message",next:()=>{}, sender:"bot",content:[`What would you like`]}
        timers.current.push(setTimeout(()=>{
            dispatch(AddMessage(newQuestion))
        },500))
        setOptions([{name:'Coffee', onClick:()=>getCategory('coffee')},{name:'Drink',onClick:()=>getCategory('drink')},{name:'Snacks',onClick:()=>getCategory('snack')}])
        timers.current.push(setTimeout(()=>{
            setShowOptions(true)
        },1000))
    },[dispatch, getCategory, setOptions, setShowOptions])
    return getSomethingElseMessage
    
}
