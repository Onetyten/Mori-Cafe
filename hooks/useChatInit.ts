import { AddMessage, initialize, NewMessage } from "@/store/messageListSlice";
import { subCategories } from "@/types/messageTypes";
import type { RootState } from "@/utils/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UseChatInitProps {
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>;
    setOptions: React.Dispatch<React.SetStateAction<{ 
        name: string;
        onClick: () => void;
    }[]>>;
    options: {
        name: string;
        onClick: () => void;
    }[];
    getCategory: (food: subCategories) => void
}


export function useChatInit({setShowOptions,setOptions,options,getCategory}: UseChatInitProps) {
    const dispatch = useDispatch()
    const initializeState = useSelector((state:RootState)=>state.messageList.initialized)

    const introMessage = useCallback(()=>{
        const newMessage:NewMessage = {type:"message", sender:"bot", next:()=>{setShowOptions(true)}, content:['Hey there! I’m Mori','your digital barista','What are you craving today?']}
        dispatch(AddMessage(newMessage))
    },[dispatch, setShowOptions])
    
    useEffect(() => {
        if (options.length === 0 && getCategory) {
            setOptions([
                { name: 'Coffee', onClick: () => getCategory('coffee') },
                { name: 'Drink', onClick: () => getCategory('drink') },
                { name: 'Snacks', onClick: () => getCategory('snack') }
            ]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCategory, options.length]);

    useEffect(()=>{
        if ( initializeState === true ) return
        introMessage()
        dispatch(initialize())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

}

