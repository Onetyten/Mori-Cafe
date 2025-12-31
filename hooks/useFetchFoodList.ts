import { AddMessage, NewMessage } from '@/store/messageListSlice';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';


export default function useFetchFoodList(loading:boolean,setLoading:React.Dispatch<React.SetStateAction<boolean>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getSomethingElseMessage:(message: string) => void)
{
    const dispatch = useDispatch()



    const fetchFoodList = useCallback(async(endpoint:string,expression:string)=>{
        if (loading) return
        setLoading(true)

        function addFood(endpoint:string){
            const newList:NewMessage = {type:"food-list",next:()=>{},route:endpoint}
            dispatch(AddMessage(newList))
            setOptions([{name:'Get something else', onClick:()=>getSomethingElseMessage("Let’s try something different.")}])
        }
        
        try
        {
            const newMessage:NewMessage = {type:"message",next:()=>{addFood(endpoint)}, sender:"bot",content:[expression]}
            dispatch(AddMessage(newMessage))
            setShowOptions(false)
        }
        catch (error) {
            console.error(error)
        }

    },[dispatch, getSomethingElseMessage, loading, setLoading, setOptions, setShowOptions])

    return fetchFoodList
}
