import { AddMessage, NewMessage, updateMessage } from "@/store/messageListSlice";
import { messageListType } from "@/types/messageTypes";
import api from "@/utils/api";
import { isAxiosError } from "axios";
import { useDispatch } from "react-redux";



export default function useRenderFoodCarousel (setLoading:React.Dispatch<React.SetStateAction<boolean>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>, loading:boolean) {

    const dispatch = useDispatch()
    
    async function renderFoodCarousel(message:messageListType){
        if (!message || message.type !== "foodCarousel") return
        try {
            setShowOptions(false)
            const response = await api.get(message.route)
            if (response.data.success === false) return
            dispatch(updateMessage({id:message.id,update:{content:response.data.data}}))
            if (message.next) message.next()
        }

        catch (error) {
            let message = ""
            if (isAxiosError(error)){
                message = error.response?.data.message || "Couldn't get get this category"
            }
            else{
                message = "Food not found"
            }
            const newMessage:NewMessage = {type:"message", sender:"bot", next:()=>{}, content:[message]}
            dispatch(AddMessage(newMessage))
        } 

        finally {
            dispatch(updateMessage({id:message.id,update:{fetched:true}}))
            setLoading(false)
            setShowOptions(true)
        }

    }

    return {renderFoodCarousel}
}