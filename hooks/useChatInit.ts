import { AddMessage } from "@/store/messageListSlice";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/store";

interface UseChatInitProps {
    initiatedRef: React.RefObject<boolean>;
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>;
}

export function useChatInit({initiatedRef,setShowOptions}: UseChatInitProps) {
    const dispatch = useDispatch()
    const pendingOrders = useSelector((state:RootState)=>state.pendingOrders.pendingOrders)
    const user = useSelector((state:RootState)=>state.user.user)

    const introMessage = useCallback(()=>{
        const newMessage = {type:"message", sender:"bot", next:()=>{setShowOptions(true)}, content:['Hey there! I’m Mori','your digital barista','What are you craving today?']}
        dispatch(AddMessage(newMessage))
    },[dispatch, setShowOptions])


    useEffect(()=>{

        if (initiatedRef.current) return
        initiatedRef.current = true
        let addMessageTimeout:(number | undefined);
        if (pendingOrders.length>0 && user ){
            const newMessage = {type:"message", sender:"bot", next:()=>{}, content:['Please wait while I confirm your payment…']}
            dispatch(AddMessage(newMessage))
            addMessageTimeout = setTimeout(()=>{const newMessage = {type:"order-receipt", sender:"bot", next:()=>introMessage(), content:[]}
                dispatch(AddMessage(newMessage))
            },1500)
        }
        else{
            introMessage()
        }
        return ()=>{
            initiatedRef.current = true
            if (addMessageTimeout) clearTimeout(addMessageTimeout)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

}

