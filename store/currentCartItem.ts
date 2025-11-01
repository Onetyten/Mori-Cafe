import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { cartType } from '../types/type'

interface CartState {
  cart: cartType | null
}

const initialState: CartState = {
  cart: null,
}

const currentCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCurrentCart: (state, action: PayloadAction<cartType>) => {
        state.cart = action.payload
    },
    updateCustomisation: (state, action: PayloadAction<cartType["customisation"]>) => {
        if (state.cart) {
            state.cart.customisation = action.payload
        }
    },
    clearCurrentCart: (state) => {
        state.cart = null
    },
  },
})

export const { setCurrentCart, updateCustomisation, clearCurrentCart } = currentCartSlice.actions
export default currentCartSlice.reducer

