import React from 'react'
import { useDispatch, useStore } from 'react-redux'
import type { RootState } from '../utils/store'
import { setOrder } from '../store/newOrderSlice'
import type { messageListType } from '../types/type';

export default function useCalculatePrice(getSomethingElseMessage:(message: string) => void,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>) {
    const dispatch = useDispatch()
    const store = useStore<RootState>()
    function calculateSelectedPrice(){
        const cart = store.getState().orderList.orderList
        const OrderPayload = {
            name:"",
            address:"",
            email:"",
            phone_number:"",
            items:cart
        }
        dispatch(setOrder(OrderPayload))
        setShowOptions(false)
        const orderPrice = cart.reduce((sum,delta)=>sum+(delta.totalPrice*delta.quantity),0)
        const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Your total is ${orderPrice}`]}
        setMessageList((prev)=>[...prev, newMessage ])
        setTimeout(()=>{
            setOptions([{name:'Select address', onClick:selectInfo},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
            setShowOptions(true)
        },1500)
    }

    function selectInfo(){
        const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Enter your delivery information`]}
        setMessageList((prev)=>[...prev, newMessage ])
        
        setTimeout(()=>{
            setOptions([{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
            const newInput = {type:"enter-info",next:()=>{}, sender:"bot",content:[]}
            setMessageList((prev)=>[...prev, newInput ])
        },1000)
    }


    return calculateSelectedPrice
}
