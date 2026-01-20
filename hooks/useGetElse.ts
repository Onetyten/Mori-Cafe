import { AddMessage, NewMessage, removeMessage } from '@/store/messageListSlice';
import { messageListType, subCategories } from '@/types/messageTypes';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function useGetElse(setLoading: React.Dispatch<React.SetStateAction<boolean>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getCategory: (food: subCategories) => void) {
    const dispatch = useDispatch()
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])
    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, []);


    const getSomethingElseMessage = useCallback((message:string,item?:messageListType)=>{
        if (item){
            dispatch(removeMessage(item.id))
        }
        setLoading(false)
        setShowOptions(false)
        const  newMessage:NewMessage = {type:"message",next:()=>{}, sender:"user",content:[message]}
        dispatch(AddMessage(newMessage))
        const newQuestion:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[`What would you like`]}
        timers.current.push(setTimeout(()=>{
            dispatch(AddMessage(newQuestion))
        },500))
        setOptions([{name:'Coffee', onClick:()=>getCategory('coffee')},{name:'Drink',onClick:()=>getCategory('drink')},{name:'Snacks',onClick:()=>getCategory('snack')}])
        timers.current.push(setTimeout(()=>{
            setShowOptions(true)
        },1000))
    },[dispatch, getCategory, setLoading, setOptions, setShowOptions])
    return getSomethingElseMessage
    
}
