import { updateMessage } from "@/store/messageListSlice"
import { messageListType } from "@/types/messageTypes"
import api from "@/utils/api"
import { RootState } from "@/utils/store"
import { useDispatch, useSelector } from "react-redux"


export function useRenderCustomisatonList() {

    const cart = useSelector((state:RootState)=>state.cart.cart)
    const foodRedux = useSelector((state:RootState)=>state.food.food)
    const dispatch = useDispatch()
    
    async function renderCustomisationList(message:messageListType){
        if (message.type !== "editList" || !cart) return
        if (cart.foodId !== foodRedux?._id){
            if (message.next) message.next()
            return
        }

        try {
            const response = await api.post('/food/custom/fetch',{customisationId:foodRedux.customisationId})
            if (!response.data.success) return
            const customisations = response.data.data
            dispatch(updateMessage({id:message.id,update:{customisations}}))
        } 
        catch (error) {
            console.error(error)
            if (message.next) message.next()
        }
        finally{
            dispatch(updateMessage({id:message.id,update:{fetched:true}}))
        }
        
    }

    return {renderCustomisationList}
}