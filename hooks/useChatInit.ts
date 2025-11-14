import { AddMessage } from "@/store/messageListSlice";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/store";

interface UseChatInitProps {
    scrollRef: React.RefObject<ScrollView | null>;
    initiatedRef: React.RefObject<boolean>;
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>;
    setShowButtons: React.Dispatch<React.SetStateAction<boolean>>
}

export function useChatInit({scrollRef,initiatedRef,setShowOptions,setShowButtons}: UseChatInitProps) {
    const dispatch = useDispatch()
    const messageList = useSelector((state:RootState)=>state.messageList.messageList)
    const pendingOrders = useSelector((state:RootState)=>state.pendingOrders.pendingOrders)
    const user = useSelector((state:RootState)=>state.user.user)

    function introMessage(){
        const newMessage = {type:"message", sender:"bot", next:()=>{setShowOptions(true)}, content:['Hey there! I’m Mori','your digital barista','What are you craving today?']}
        dispatch(AddMessage(newMessage))
    }

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowButtons(false)
        scrollRef.current?.scrollTo({y:500,animated:true });
        }, 500);

        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageList, scrollRef]);


    useEffect(()=>{
        if (!initiatedRef.current===false)return
        initiatedRef.current = true
        if (pendingOrders.length>0 && user ){
            const newMessage = {type:"message", sender:"bot", next:()=>{}, content:['Please wait while I confirm your payment…']}
            dispatch(AddMessage(newMessage))

            setTimeout(()=>{const newMessage = {type:"order-receipt", sender:"bot", next:()=>introMessage(), content:[]}
                dispatch(AddMessage(newMessage))
            },1500)
        }
        else{
            introMessage()
        }

        return ()=>{
            initiatedRef.current = true
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

}

