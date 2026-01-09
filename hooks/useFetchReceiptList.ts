import { AddMessage, NewMessage } from '@/store/messageListSlice'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export default function useFetchReceiptList(loading:boolean)
{
    const dispatch =useDispatch()
    const delay = (ms:number)=> new Promise(resolve=>setTimeout(resolve,ms))

    const fetchReceiptList = useCallback(async()=>{
        if (loading) return
        try
        {   
            const newCommand:NewMessage = {type:"message",next:()=>{}, sender:"user",content:['show my order history']}
            dispatch(AddMessage(newCommand))            
            await delay(500)
            const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:['Getting order history...']}
            dispatch(AddMessage(newMessage))
            
            await delay(200)
            const newReceipt:NewMessage = {type:"receiptList"}
            dispatch(AddMessage(newReceipt))
        }
        catch (error) {
            console.error(error)
        }
    },[dispatch, loading])
    return fetchReceiptList
}
