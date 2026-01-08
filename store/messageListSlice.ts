import { cartFeedback, chatMessage, checkoutList, confirmToCartTrigger, editListType, foodCarouselMessage, messageListType, numberCountTrigger, numberInputMessage, orderFeedbackType, subCarouselMessage, userInputType } from "@/types/messageTypes";
import { tweakType } from "@/types/type";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { countryCodes } from '../utils/data';


const initialState:{ messageList:messageListType[],initialized:boolean} = {
    messageList: [],
    initialized: false
}

type NewChatMessage = Omit<chatMessage, "id"|"isTyping"|"displayedText">
type NewSubCarouselMessage = Omit<subCarouselMessage, "id"|"fetched"|"content">
type NewFoodListMessage = Omit<foodCarouselMessage, "id"|"fetched"|"content">
type NewFoodInput = Omit<numberInputMessage, "id"|"confirmed"|"isTyping"|"value"|"error">
type NewFoodInputTrigger = Omit<numberCountTrigger,"id">
type NewConfirmToCart = Omit<confirmToCartTrigger,"id">
type NewCartFeedback = Omit<cartFeedback,"id">
type NewOrderFeedback = Omit<orderFeedbackType,"id">
type NewUserInputType = Omit<userInputType,"id" | "location" | "address" | "confirmed" | "goBack" | "name" | "email" | "phone_number" >
type NewCartListFeedback = Omit<checkoutList,"id"|"fetched"|"final">
type NewEditListType = Omit<editListType,"id"|"fetched"|"customisations"|"confirmed"|"tweaks">
export type NewMessage = NewChatMessage | NewSubCarouselMessage | NewFoodListMessage | NewFoodInput | NewFoodInputTrigger | NewConfirmToCart | NewCartFeedback | NewEditListType | NewCartListFeedback | NewUserInputType | NewOrderFeedback

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
  editList:{
    fetched:false,
    confirmed:false,
    customisations:[],
    tweaks:[]
  },
  checkoutList:{
    fetched:false,
    final:()=>{},
  },
  enterInfo:{
    location:null,
    confirmed:false,
    address:"",
    goBack:()=>{},
    name:"",
    email: "",
    phone_number: {
        code:countryCodes[0],
        number: ""
    }
  }
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
                const id = nanoid()
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
                    case "confirmToCart":
                        return {payload : { id, ...message }}
                    case "cartFeedback":
                        return {payload : { id, ...message }}
                    case "orderFeedback":
                        return {payload : { id, ...message }}
                    case "checkoutList":
                        return {payload : { id,...messageDefaults.checkoutList, ...message }}
                    case "editList":
                        return {payload : { id, ...messageDefaults.editList, ...message }}
                    case "enterInfo":
                        return {payload : { id,...messageDefaults.enterInfo ,...message }}
                }
            }
        },

        //Text messages related reducers
        AppendTextMessage:(state,action:PayloadAction<{id:string,value:string}>)=>{
            const message = state.messageList.find(m => m.id === action.payload.id)
            if (!message || message.type !== "message") return
            message.displayedText?.push(action.payload.value)
        },
        
        UpdateTweakList:(state,action:PayloadAction<{id:string,value:tweakType}>)=>{
            const value = action.payload.value
            const message = state.messageList.find(m => m.id === action.payload.id)
            if (!message || message.type !== "editList") return
            const existingIndex = message.tweaks.findIndex((item) => item.name === value.name);
            if (existingIndex !== -1) {
                message.tweaks[existingIndex] = value;
                return
            }
            message.tweaks.push(value)
        },

        deleteTweak:(state,action:PayloadAction<{id:string,name:string}>)=>{
            const message = state.messageList.find(m => m.id === action.payload.id)
            if (!message || message.type !== "editList") return
            console.log(`deleting ${action.payload.name}}`)
            message.tweaks = message.tweaks.filter(tweak=>tweak.name !== action.payload.name )
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

        removeMessage:(state,action:PayloadAction<string>)=>{
            const deleteId = action.payload
            const Index = state.messageList.findIndex(m => m.id === deleteId)
            state.messageList.splice(Index,1)
        }
    }
})
export const {AddMessage,removeMessage,AppendTextMessage,initialize,updateMessage,UpdateTweakList,deleteTweak} = messageListSlice.actions
export default messageListSlice.reducer