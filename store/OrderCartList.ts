import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { cartListType } from '../types/type'

interface OrderListState {
  orderList: cartListType[]
}

const initialState: OrderListState = {
  orderList: [],
}

const orderCartList = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    setOrderList: (state, action: PayloadAction<cartListType[]>) => {
        state.orderList = action.payload
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
        state.orderList = state.orderList.filter((item)=>item._id !== action.payload)
    },
    changeOrderQuantity: (state, action: PayloadAction<{id:string; quantity:number}>) => {
       const order = state.orderList.find((item)=>item._id === action.payload.id)
       if (order){
        order.quantity = action.payload.quantity
       }
    },
    clearOrderList: (state) => {
        state.orderList = []
    },
  },
})

export const { setOrderList,deleteOrder,changeOrderQuantity,clearOrderList} = orderCartList.actions
export default orderCartList.reducer