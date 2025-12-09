import { createSlice } from "@reduxjs/toolkit";


interface userDetailsType {
    name:string;
    address:string;
    email:string;
    phone_number:{
        code:string;
        number:string
    };
}

const initialState:{userInfo:userDetailsType} = {
    userInfo:{
        name:"",
        address:"",
        email:"",
        phone_number:{
            code:"",
            number:""
        },
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
        setInfo:(state,action)=>{
            state.userInfo = action.payload
        },
        resetUserInfo:(state)=>{
            state.userInfo = initialState.userInfo
        }
    }
})

export const {setDeliveryName,setDeliveryAddress,setEmail,setPhoneNumber,setInfo,resetUserInfo} = userInfoSlice.actions
export default userInfoSlice.reducer