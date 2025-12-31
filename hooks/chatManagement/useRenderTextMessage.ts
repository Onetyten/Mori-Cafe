import { AppendTextMessage, setIsTyping } from "@/store/messageListSlice";
import { messageListType } from "@/types/type";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";



export function useRenderTextMessage(){
    const dispatch = useDispatch()
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])
    
    useEffect(() => {
        return () => {
            timers.current.forEach(clearTimeout)
            timers.current = []
        }
    }, [])

    function renderTextMessage(message:messageListType){
        let index = 0;

        function loadNextMessage(){
            if (!message || message.type !=="message") return
            if ( index < message.content.length) {
                dispatch(setIsTyping({id:message.id,value:true}))
                timers.current.push(setTimeout(()=>{
                    dispatch(setIsTyping({id:message.id,value:false}))
                    dispatch(AppendTextMessage({id:message.id, value:message.content[index]}))
                    index++;
                    if (index < message.content.length){
                        timers.current.push(setTimeout(() => loadNextMessage(), 200))
                    }
                    else {                     
                        if (message.next) message.next()
                    }
                },200))
            }
        }
        loadNextMessage()
    }

    return {renderTextMessage}
} 