import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { cartListType } from '../types/type'

interface CartDelState {
  cartDel: cartListType | null
}

const initialState: CartDelState = {
  cartDel: null,
}

const CartDeleteSlice = createSlice({
  name: "cartDel",
  initialState,
  reducers: {
    setDeleteCartItem: (state, action: PayloadAction<cartListType>) => {
        state.cartDel = action.payload
    },
    clearDeleteCartItem: (state) => {
        state.cartDel = null
    },
  },
})

export const { setDeleteCartItem, clearDeleteCartItem } = CartDeleteSlice.actions
export default CartDeleteSlice.reducer
