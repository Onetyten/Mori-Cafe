import { createSlice } from "@reduxjs/toolkit";


interface userDetailsType {
    name:string;
    address:string;
    email:string;
    phone_number:string;
    items:string;
}

const initialState:{userInfo:userDetailsType} = {
    userInfo:{
        name:"",
        address:"",
        email:"",
        phone_number:"",
        items:""
    }
}

const userInfoSlice = createSlice({
    name:"userInfo",
    initialState,
    reducers:{
        setDeliveryName:(state,action)=>{
            state.userInfo.name = action.payload
        },
        setDeliveryAddress:(state,action)=>{
            state.userInfo.address = action.payload
        },
        setEmail:(state,action)=>{
            state.userInfo.email = action.payload
        },
        setPhoneNumber:(state,action)=>{
            state.userInfo.phone_number = action.payload
        },
        setItems:(state,action)=>{
            state.userInfo.items = action.payload
        },
        setInfo:(state,action)=>{
            state.userInfo = action.payload
        },
        resetUserInfo:(state)=>{
            state.userInfo = initialState.userInfo
        }
    }
})

export const {setDeliveryName,setDeliveryAddress,setEmail,setPhoneNumber,setItems,setInfo,resetUserInfo} = userInfoSlice.actions
export default userInfoSlice.reducer