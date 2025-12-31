import { chatMessage, foodCarouselMessage, messageListType, numberCountTrigger, numberInputMessage, subCarouselMessage } from "@/types/messageTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState:{ messageList:messageListType[],initialized:boolean} = {
    messageList: [],
    initialized: false
}

type NewChatMessage = Omit<chatMessage, "id"|"isTyping"|"displayedText">
type NewSubCarouselMessage = Omit<subCarouselMessage, "id"|"fetched"|"content">
type NewFoodListMessage = Omit<foodCarouselMessage, "id"|"fetched"|"content">
type NewFoodInput = Omit<numberInputMessage, "id"|"confirmed"|"isTyping"|"value"|"error">
type NewFoodInputTrigger = Omit<numberCountTrigger,"id">
export type NewMessage = NewChatMessage | NewSubCarouselMessage | NewFoodListMessage | NewFoodInput | NewFoodInputTrigger

const messageDefaults =  {
  message: {
    isTyping: false,
    displayedText: []
  },
  subcarousel: {
    content: [],
    fetched: false
  },
  foodCarousel : {
    content: [],
    fetched: false
  },
  numberInput:{
    confirmed:false,
    isTyping:true,
    value:1,
    error:""
  },
}

const messageListSlice = createSlice({
    name:"messageList",
    initialState,
    reducers:{
        AddMessage:{
            reducer:(state,action:PayloadAction<messageListType>)=>{
                state.messageList.push(action.payload)
            },
            prepare :(message:NewMessage) => {
                const id = `${Date.now()}-${Math.random()}`
                switch (message.type) {
                    case "message":
                        return {payload : { id, ...messageDefaults.message, ...message }}
                    case "subcarousel":
                        return {payload : { id, ...messageDefaults.subcarousel, ...message }}
                    case "foodCarousel":
                        return {payload : { id, ...messageDefaults.foodCarousel, ...message }}
                    case "numberInput":
                        return {payload : { id, ...messageDefaults.numberInput, ...message }}
                    case "numberCountTrigger":
                        return {payload : { id, ...message }}
                }
            }
        },

        //Text messages related reducers
        AppendTextMessage:(state,action:PayloadAction<{id:string,value:string}>)=>{
            const message = state.messageList.find(m => m.id === action.payload.id)
            if (!message || message.type !== "message") return
            message.displayedText?.push(action.payload.value)
        },

        updateMessage:(state,action:PayloadAction<{id:string, update:Partial<messageListType>}>)=>{
            const payload = action.payload
            const message = state.messageList.find(m => m.id === payload.id)
            if (!message) return
            Object.assign(message,payload.update)
        },

        initialize:(state)=>{
            state.initialized = true
        },

        removeMessage:(state,action:PayloadAction<number>)=>{
            state.messageList.splice(action.payload,1)
        }
    }
})
export const {AddMessage,removeMessage,AppendTextMessage,initialize,updateMessage} = messageListSlice.actions
export default messageListSlice.reducer