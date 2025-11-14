import React from 'react';
import { useDispatch } from 'react-redux';
import { AddMessage } from '@/store/messageListSlice';



export default function useSubcategory(setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>) {
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

    const getCategory= (food:string)=>{
        setShowOptions(false)
        const  newMessage = {type:"message",next:()=>getSubcategoryMessage(food), sender:"user",content:[` ${food==='snack'?"Some":"A"} ${food}${food==='snack'?"s":""}`]}
        dispatch(AddMessage(newMessage))
    }
    
    const getSubcategoryMessage = (category:string)=>{
        setShowOptions(false)
        const newMessage = {type:"message",next:()=>showSubcategoryCarousel(category), sender:"bot",content:[`What kind of ${category} would you like`]}
        dispatch(AddMessage(newMessage))
    }

    const showSubcategoryCarousel=(category:string)=>{
        setShowOptions(false)
        const newCarousel = {type:"subcarousel",next:()=>subCategoryCleanup(), sender:"bot",content:[category]}
        dispatch(AddMessage(newCarousel))
    }

    function subCategoryCleanup(){
        setOptions([{name:'Get something else', onClick:()=>getSomethingElseMessage("Let’s try something different.")}])
        setShowOptions(true)
    }

    return {getCategory,getSubcategoryMessage,showSubcategoryCarousel,subCategoryCleanup}
}
