import React from 'react'
import type {messageListType} from "../types/type"

export default function useFetchReceiptList(setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>)
{
    function fetchReceiptList(){
        try
        {   
            const newCommand = {type:"message",next:()=>{}, sender:"user",content:['Fetch my order history']}
            setMessageList((prev)=>[...prev, newCommand ])

            setTimeout(()=>{
                const newMessage = {type:"message",next:()=>{}, sender:"bot",content:['Fetching History...']}
                setMessageList((prev)=>[...prev, newMessage ])
            },1000)
            setTimeout(()=>{
                const newReceipt:messageListType = {type:"receipt-list",next:()=>{}, sender:"bot",content:[]}
                setMessageList((prev)=>[...prev, newReceipt])
            },2000)
        }
        catch (error) {
            console.error(error)
        }
    }

    return fetchReceiptList
}
