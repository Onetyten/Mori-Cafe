import { createSlice } from "@reduxjs/toolkit";

const initialState:{showModal:boolean} = {
    showModal:false
}

const showModalSlice = createSlice({
    name:'showModal',
    initialState,
    reducers:{
        showModal:(state)=>{
            state.showModal = true
        },
        hideModal:(state)=>{
            state.showModal = false
        },
        toggleModal:(state)=>{
            state.showModal = !state
        }
    }
})

export const {showModal,hideModal,toggleModal} = showModalSlice.actions
export default showModalSlice.reducer