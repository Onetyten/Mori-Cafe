import React from 'react';
import type { messageListType } from "../types/type";



export default function useSubcategory(setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>) {

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

    const getCategory= (food:string)=>{
        setShowOptions(false)
        const  newMessage = {type:"message",next:()=>getSubcategoryMessage(food), sender:"user",content:[` ${food==='snack'?"Some":"A"} ${food}${food==='snack'?"s":""}`]}
        setMessageList((prev)=>[...prev, newMessage ])
    }
    
    const getSubcategoryMessage = (category:string)=>{
        setShowOptions(false)
        const newMessage = {type:"message",next:()=>showSubcategoryCarousel(category), sender:"bot",content:[`What kind of ${category} would you like`]}
        setMessageList((prev)=>[...prev, newMessage ])
    }

    const showSubcategoryCarousel=(category:string)=>{
        setShowOptions(false)
        const newCarousel = {type:"subcarousel",next:()=>subCategoryCleanup(), sender:"bot",content:[category]}
        setMessageList((prev)=>[...prev, newCarousel ])
    }

    function subCategoryCleanup(){
        setOptions([{name:'Get something else', onClick:()=>getSomethingElseMessage("Let’s try something different.")}])
        setShowOptions(true)
    }

    return {getCategory,getSubcategoryMessage,showSubcategoryCarousel,subCategoryCleanup}
}
