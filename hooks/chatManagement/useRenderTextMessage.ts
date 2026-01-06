import { AppendTextMessage, updateMessage } from "@/store/messageListSlice";
import { messageListType } from "@/types/messageTypes";
import { useRef } from "react";
import { useDispatch } from "react-redux";



export function useRenderTextMessage(){
    const dispatch = useDispatch()
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])
    
    

    function renderTextMessage(message:messageListType){
        let index = 0;

        function loadNextMessage(){
            if (!message || message.type !=="message") return
            if ( message.displayedText.length < message.content.length) {
                dispatch(updateMessage({id:message.id,update:{isTyping:true}}))

                timers.current.push(setTimeout(()=>{
                    dispatch(updateMessage({id:message.id,update:{ isTyping:false }}))
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