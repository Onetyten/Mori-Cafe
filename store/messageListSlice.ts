import { messageListType } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface newMessageType{
    type:string,
    sender:string,
    next:()=>void,
    content:any[]
}

const initialState:{ messageList:messageListType[]} = {
    messageList:[]
}


const messageListSlice = createSlice({
    name:"messageList",
    initialState,
    reducers:{
        AddMessage:(state,action:PayloadAction<newMessageType>)=>{
            state.messageList.push({id:`${Date.now()}-${Math.random()}`,...action.payload})
        },
        removeMessage:(state,action:PayloadAction<number>)=>{
            state.messageList.splice(action.payload,1)
        }
    }
})
export const {AddMessage,removeMessage} = messageListSlice.actions
export default messageListSlice.reducer