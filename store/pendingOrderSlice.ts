import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState:{pendingOrders:string[]}={
    pendingOrders:[]
}   



const pendingOrderSlice = createSlice({
    name:'pendingOrders',
    initialState,
    reducers:{
        addPendingOrder:(state,action:PayloadAction<string>)=>{
            state.pendingOrders.push(action.payload)
        },
        clearPendingOrder:(state,action:PayloadAction<string>)=>{
            state.pendingOrders = state.pendingOrders.filter(item=>item !== action.payload)
        }
    }
})

export const {addPendingOrder,clearPendingOrder} = pendingOrderSlice.actions
export default pendingOrderSlice.reducer