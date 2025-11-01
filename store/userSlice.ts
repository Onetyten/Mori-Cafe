import { createSlice } from "@reduxjs/toolkit";


const initialState:{user:string} = {
    user:''
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
        clearUser:(state,action)=>{
            state.user = action.payload
        }
    }
})

export const {setUser,clearUser} = userSlice.actions
export default userSlice.reducer