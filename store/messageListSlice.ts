import { chatMessage, foodCarouselMessage, messageListType, subCarouselMessage } from "@/types/messageTypes";
import { FoodType, subCategoryType } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState:{ messageList:messageListType[],initialized:boolean} = {
    messageList: [],
    initialized: false
}

type NewChatMessage = Omit<chatMessage, "id"|"isTyping"|"displayedText">
type NewSubCarouselMessage = Omit<subCarouselMessage, "id"|"fetched"|"content">
type NewFoodListMessage = Omit<foodCarouselMessage, "id"|"fetched"|"content">
export type NewMessage = NewChatMessage | NewSubCarouselMessage | NewFoodListMessage


const messageListSlice = createSlice({
    name:"messageList",
    initialState,
    reducers:{
        AddMessage:{
            reducer:(state,action:PayloadAction<messageListType>)=>{
                state.messageList.push(action.payload)
            },
            prepare :(message:NewMessage) => {
                switch (message.type){
                    case "message":
                        return{
                            payload:{
                                id:`${Date.now()}-${Math.random()}`,
                                isTyping:true,
                                displayedText:[],
                                ...message
                            }
                        }
                    case "subcarousel":
                        return {
                            payload:{
                                id:`${Date.now()}-${Math.random()}`,
                                content:[],
                                fetched:false,
                                ...message
                            }
                        }
                    case "food-list":
                        return {
                            payload:{
                                id:`${Date.now()}-${Math.random()}`,
                                content:[],
                                fetched:false,
                                ...message
                            }
                        }
                }
                    
            }
        },

        //Text messages related reducers
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

        //Subcategory related reducers
        hydrateSubcategories:(state,action:PayloadAction<{id:string, value:subCategoryType[]}>)=>{
            const message = state.messageList.find(m => m.id === action.payload.id)
            if (!message || message.type !== "subcarousel") return
            message.content = action.payload.value
        },
        setSubcategoryState:(state,action:PayloadAction<{id:string, value:boolean}>)=>{
            const message = state.messageList.find(m => m.id === action.payload.id)
            if (!message || message.type !== "subcarousel") return
            message.fetched = action.payload.value
        },

        // food list
        hydrateFoodList:(state,action:PayloadAction<{id:string, value:FoodType[]}>)=>{
            const message = state.messageList.find(m => m.id === action.payload.id)
            if (!message || message.type !== "food-list") return
            message.content = action.payload.value
        },

        setfoodListState:(state,action:PayloadAction<{id:string, value:boolean}>)=>{
            const message = state.messageList.find(m => m.id === action.payload.id)
            if (!message || message.type !== "food-list") return
            message.fetched = action.payload.value
        },


        initialize:(state)=>{
            state.initialized = true
        },

        removeMessage:(state,action:PayloadAction<number>)=>{
            state.messageList.splice(action.payload,1)
        }
    }
})
export const {AddMessage,removeMessage,setIsTyping,AppendTextMessage,hydrateFoodList,hydrateSubcategories,initialize,setSubcategoryState,setfoodListState} = messageListSlice.actions
export default messageListSlice.reducer