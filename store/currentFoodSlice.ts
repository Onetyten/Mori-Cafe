import { createSlice } from '@reduxjs/toolkit'
import type { FoodType } from '../types/type'

const initialState:{food:FoodType|null} = {
    food:null
}

const currentFoodSlice = createSlice({
    name:'food',
    initialState,
    reducers:{
        setFood:(state,action)=>{
            state.food = action.payload
        },
        clearFood:(state)=>{
            state.food = null
        }
    }
})
export const {setFood,clearFood} = currentFoodSlice.actions
export default currentFoodSlice.reducer