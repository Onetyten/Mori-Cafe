import { chatMessage, messageListType, subCarouselMessage } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState:{ messageList:messageListType[]} = {
    messageList:[]
}

type NewChatMessage = Omit<chatMessage, "id"|"isTyping"|"displayedText">
type NewSubCarouselMessage = Omit<subCarouselMessage, "id">
export type NewMessage = NewChatMessage | NewSubCarouselMessage


const messageListSlice = createSlice({
    name:"messageList",
    initialState,
    reducers:{
        AddMessage:{
            reducer:(state,action:PayloadAction<messageListType>)=>{
                state.messageList.push(action.payload)
            },
            prepare :(message:NewMessage) => {
                return{
                    payload:{
                        id:`${Date.now()}-${Math.random()}`,
                        isTyping:true,
                        displayedText:[],
                        ...message
                    }
                }
            }
        },
        setIsTyping:(state,action:PayloadAction<{id:string,value:boolean}>)=>{
            const message = state.messageList.find(m => m.id === action.payload.id)
            if (!message || message.type !== "message") return
            message.isTyping = action.payload.value
        },
        AppendTextMessage:(state,action:PayloadAction<{id:string,value:string}>)=>{
            const message = state.messageList.find(m => m.id === action.payload.id)
            if (!message || message.type !== "message") return
            message.displayedText?.push(action.payload.value)
        },
        removeMessage:(state,action:PayloadAction<number>)=>{
            state.messageList.splice(action.payload,1)
        }
    }
})
export const {AddMessage,removeMessage,setIsTyping,AppendTextMessage} = messageListSlice.actions
export default messageListSlice.reducer