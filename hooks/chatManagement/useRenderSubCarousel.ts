import { AddMessage, NewMessage, updateMessage } from "@/store/messageListSlice";
import { messageListType } from "@/types/messageTypes";
import api from "@/utils/api";
import { isAxiosError } from "axios";
import { useDispatch } from "react-redux";



export default function useRenderSubcarousel(){
    const dispatch = useDispatch()
    
    async function renderSubcarousel(message:messageListType){
        if (!message || message.type !== "subcarousel") return
        const category = message.subcategory
        if (!category) return;
        
        try {
            const response = await api.get(`/food/subcategory78/${message.subcategory}`)
            dispatch(updateMessage({id:message.id, update:{content:response.data.data}}))
            if (message.next) message.next()
        }
     
        catch (error) {
            let message = ""
            if (isAxiosError(error)){
                message = error.response?.data.message || "Couldn't get get this category"
            }
            else{
                message = "Couldn't get get this category"
            }
            const newMessage:NewMessage = {type:"message", sender:"bot", next:()=>{}, content:[message]}
            
            dispatch(AddMessage(newMessage))
        }
        finally {
            dispatch(updateMessage({id:message.id, update:{fetched:true}}))
        }
    }

    return {renderSubcarousel}
}