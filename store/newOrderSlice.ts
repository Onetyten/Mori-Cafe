import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { orderType } from '../types/type';



interface newOrderState{
    newOrder:orderType | null
}

const initialState:newOrderState = {
    newOrder:null
}


const newOrderSlice = createSlice({
    name:'newOrder',
    initialState,
    reducers:{
        setOrder:(state,action:PayloadAction<orderType>)=>{
            state.newOrder = action.payload
        },
        updateOrderInfo:(state,action:PayloadAction<Partial<orderType>>)=>{
            if (state.newOrder){
                Object.assign(state.newOrder,action.payload)
            } 
        },
        clearOrder:(state)=>{
            state.newOrder = null
        }
    }
})

export const {setOrder,clearOrder,updateOrderInfo} = newOrderSlice.actions
export default newOrderSlice.reducer