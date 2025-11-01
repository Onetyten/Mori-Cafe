import React from 'react'
import type {messageListType} from "../types/type"

export default function useFetchFoodList(loading:boolean,setLoading:React.Dispatch<React.SetStateAction<boolean>>,setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getSomethingElseMessage:(message: string) => void)
{
    function fetchFoodList(endpoint:string,expression:string){
        if (loading) return
        setLoading(true)
        try
        {
            const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[expression]}
            setMessageList((prev)=>[...prev, newMessage ])
            setShowOptions(false)
            const newList:messageListType = {type:"food-list",next:()=>{}, sender:"bot",content:[endpoint]}
            setMessageList((prev)=>[...prev, newList])
            setOptions([{name:'Get something else', onClick:()=>getSomethingElseMessage("Let’s try something different.")}])
            setShowOptions(false)
        }
        catch (error) {
            console.error(error)
        }
    }

    return fetchFoodList
}
