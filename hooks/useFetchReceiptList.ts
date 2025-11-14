import { useDispatch } from 'react-redux'
import { AddMessage } from '@/store/messageListSlice'

export default function useFetchReceiptList()
{
    const dispatch =useDispatch()
    function fetchReceiptList(){
        try
        {   
            const newCommand = {type:"message",next:()=>{}, sender:"user",content:['Fetch my order history']}
            dispatch(AddMessage(newCommand))            

            setTimeout(()=>{
                const newMessage = {type:"message",next:()=>{}, sender:"bot",content:['Fetching History...']}
                dispatch(AddMessage(newMessage))
            },1000)
            setTimeout(()=>{
                const newReceipt = {type:"receipt-list",next:()=>{}, sender:"bot",content:[]}
                dispatch(AddMessage(newReceipt))
            },2000)
        }
        catch (error) {
            console.error(error)
        }
    }

    return fetchReceiptList
}
