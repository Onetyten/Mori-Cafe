import { AddMessage } from '@/store/messageListSlice'
import { useCallback, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

export default function useFetchReceiptList()
{
    const dispatch =useDispatch()
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])
    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, []);
    const fetchReceiptList = useCallback(()=>{
        try
        {   
            const newCommand = {type:"message",next:()=>{}, sender:"user",content:['show my order history']}
            dispatch(AddMessage(newCommand))            
            timers.current.push(setTimeout(()=>{
                const newMessage = {type:"message",next:()=>{}, sender:"bot",content:['Getting history...']}
                dispatch(AddMessage(newMessage))
            },1000))
            
            timers.current.push(setTimeout(()=>{
                const newReceipt = {type:"receipt-list",next:()=>{}, sender:"bot",content:[]}
                dispatch(AddMessage(newReceipt))
            },2000))
        }
        catch (error) {
            console.error(error)
        }
    },[dispatch])
    return fetchReceiptList
}
