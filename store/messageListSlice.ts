import { messageListType } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:{ messageList:messageListType[]} = {
    messageList:[]
}

const messageListSlice = createSlice({
    name:"messageList",
    initialState,
    reducers:{
        AddMessage:(state,action:PayloadAction<messageListType>)=>{
            state.messageList.push(action.payload)
        },
        removeMessage:(state,action:PayloadAction<number>)=>{
            state.messageList.splice(action.payload,1)
        }
    }
})
export const {AddMessage,removeMessage} = messageListSlice.actions
export default messageListSlice.reducer