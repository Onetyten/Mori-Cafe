import { AddMessage, NewMessage } from "@/store/messageListSlice";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

interface UseChatInitProps {
    initiatedRef: React.RefObject<boolean>;
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>;
    setOptions: React.Dispatch<React.SetStateAction<{ 
        name: string;
        onClick: () => void;
    }[]>>;
    options: {
        name: string;
        onClick: () => void;
    }[];
    getCategory: (food: string) => void
}

export function useChatInit({initiatedRef,setShowOptions,setOptions,options,getCategory}: UseChatInitProps) {
    const dispatch = useDispatch()
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
        if (initiatedRef.current) return
        initiatedRef.current = true
        let addMessageTimeout:(number | undefined);
        introMessage()
        return ()=>{
            initiatedRef.current = true
            if (addMessageTimeout) clearTimeout(addMessageTimeout)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

}

