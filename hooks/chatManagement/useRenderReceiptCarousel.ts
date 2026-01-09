import { AddMessage, NewMessage, updateMessage } from "@/store/messageListSlice";
import { messageListType } from "@/types/messageTypes";
import api from "@/utils/api";
import { isAxiosError } from "axios";
import { useDispatch } from "react-redux";

export function useRenderReceiptCarousel(setShowOptions: React.Dispatch<React.SetStateAction<boolean>>) {
    const dispatch = useDispatch()
    
 
    async function renderReceiptCarousel(message:messageListType){
        if (message.type !== "receiptList") return

        try {
            setShowOptions(false)
            const response = await api.post('/order/fetch/?limit=10')
            dispatch(updateMessage({id:message.id,update:{content:response.data.data}}))
            if (response.data.data.length===0){
                const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:["No history found"]}
                dispatch(AddMessage(newMessage))
            }
            else{
                const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:["Here are your past orders"]}
                dispatch(AddMessage(newMessage))
            }
            
        }

        catch (error) {
            let feedback  = ""
            if (isAxiosError(error)) feedback = error.response?.data.message ||"No history found"
            else  feedback = "No history found"
            const newMessage:NewMessage = {type:"message",next:()=>{}, sender:"bot",content:[feedback]}
            dispatch(AddMessage(newMessage))
        }
        finally {
            dispatch(updateMessage({id:message.id,update:{fetched:true}}))
            setShowOptions(true)
        }
    }

    return {renderReceiptCarousel}
}