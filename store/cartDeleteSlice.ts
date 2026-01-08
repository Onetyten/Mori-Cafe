import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { cartListType } from '../types/type'
import { messageListType } from "@/types/messageTypes"

interface CartDelState {
  cartDel: {message:messageListType | null,item:cartListType | null}
}

const initialState: CartDelState = {
  cartDel: {message:null,item:null},
}

const CartDeleteSlice = createSlice({
  name: "cartDel",
  initialState,
  reducers: {
    setDeleteCartItem: (state, action: PayloadAction<{message:messageListType,item:cartListType}>) => {
        state.cartDel = action.payload
    },
    clearDeleteCartItem: (state) => {
        state.cartDel = {message:null,item:null}
    },
  },
})

export const { setDeleteCartItem, clearDeleteCartItem } = CartDeleteSlice.actions
export default CartDeleteSlice.reducer
