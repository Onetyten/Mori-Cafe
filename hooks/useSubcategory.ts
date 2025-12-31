/* eslint-disable react-hooks/exhaustive-deps */
import { AddMessage, NewMessage } from '@/store/messageListSlice';
import { subCategories } from '@/types/messageTypes';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';



export default function useSubcategory(setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>) {
    const dispatch = useDispatch()
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])
    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, []);
    
    const subCategoryCleanup = useCallback(()=>{
        setOptions([{name:'Get something else', onClick:()=>getSomethingElseMessage("Let’s try something different.")}])
        setShowOptions(true)
    },[setOptions, setShowOptions])

    const showSubcategoryCarousel=useCallback((category:subCategories)=>{
        setShowOptions(false)
        const newCarousel:NewMessage = {type:"subcarousel",next:()=>subCategoryCleanup(), subcategory:category,}
        timers.current.push(setTimeout(()=>{
            dispatch(AddMessage(newCarousel))
        },500))
    },[dispatch, setShowOptions, subCategoryCleanup])

    const getSubcategoryMessage = useCallback((category:subCategories)=>{
        setShowOptions(false)
        const newMessage:NewMessage = {type:"message",next:()=>showSubcategoryCarousel(category), sender:"bot",content:[`What kind of ${category} would you like`]}
        dispatch(AddMessage(newMessage))
    },[dispatch, setShowOptions, showSubcategoryCarousel])


    const getCategory= useCallback((food:subCategories)=>{
        setShowOptions(false)
        const  newMessage:NewMessage = {type:"message",next:()=>getSubcategoryMessage(food), sender:"user",content:[` ${food==='snack'?"Some":"A"} ${food}${food==='snack'?"s":""}`]}
        dispatch(AddMessage(newMessage))
    },[dispatch, getSubcategoryMessage, setShowOptions])

    const getSomethingElseMessage =useCallback((message:string)=>{
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
    },[dispatch, getCategory, setOptions, setShowOptions])





    





    return {getCategory,getSubcategoryMessage,showSubcategoryCarousel,subCategoryCleanup}
}
