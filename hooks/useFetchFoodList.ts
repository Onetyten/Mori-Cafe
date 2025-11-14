import React from 'react'
import type {messageListType} from "../types/type"
import { useDispatch } from 'react-redux';
import { AddMessage } from '@/store/messageListSlice';

export default function useFetchFoodList(loading:boolean,setLoading:React.Dispatch<React.SetStateAction<boolean>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getSomethingElseMessage:(message: string) => void)
{
    const dispatch = useDispatch()
    function fetchFoodList(endpoint:string,expression:string){
        if (loading) return
        setLoading(true)
        try
        {
            const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[expression]}
            dispatch(AddMessage(newMessage))
            setShowOptions(false)
            const newList:messageListType = {type:"food-list",next:()=>{}, sender:"bot",content:[endpoint]}
            dispatch(AddMessage(newList))
            setOptions([{name:'Get something else', onClick:()=>getSomethingElseMessage("Let’s try something different.")}])
            setShowOptions(false)
        }
        catch (error) {
            console.error(error)
        }
    }

    return fetchFoodList
}
